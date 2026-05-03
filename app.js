const { useState, useEffect, useRef, useCallback } = React;

// ===================== CONSTANTS =====================
const PURPLE = "#7C6FCD";
const PURPLE_LIGHT = "#EDE9FE";
const PURPLE_DARK = "#5B4FC7";
const PURPLE_MID = "#9B8FDB";

const CARD_GRADIENTS = [
  "linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 100%)",
  "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)",
  "linear-gradient(135deg, #DCFCE7 0%, #A7F3D0 100%)",
  "linear-gradient(135deg, #FCE7F3 0%, #FBCFE8 100%)",
  "linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)",
  "linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)",
  "linear-gradient(135deg, #F0FDF4 0%, #BBF7D0 100%)",
  "linear-gradient(135deg, #F5F3FF 0%, #DDD6FE 100%)",
];

const BACKEND_URL = "https://kagongpossiblebackend-production.up.railway.app";

// ===================== 세션 ID + 닉네임 =====================
function getSessionId() {
  let sid = localStorage.getItem("kagong_session_id");
  if (!sid) {
    sid = "sid_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem("kagong_session_id", sid);
  }
  return sid;
}
const SESSION_ID = getSessionId();

function getNickname() {
  return localStorage.getItem("kagong_nickname") || "";
}
function saveNickname(name) {
  localStorage.setItem("kagong_nickname", name);
}

// ===================== 통계 수집 =====================
const track = async (eventName, params = {}) => {
  try {
    fetch(`${BACKEND_URL}/api/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: eventName,
        cafe_id: params.cafe_id ?? null,
        cafe_name: params.cafe_name ?? null,
        value: params.source ?? params.search_term ?? params.filter_tags ?? params.filter_tag ?? null,
        meta: params,
      }),
    }).catch(() => {});
    console.log(`[TRACK] ${eventName}`, params);
  } catch (e) {}
};

// ===================== TAG CHIP =====================
function TagChip({ label, selected, onClick, size = "md" }) {
  const sizes = { sm: { fontSize: 11, padding: "3px 9px" }, md: { fontSize: 13, padding: "6px 13px" } };
  const colors = selected
    ? { background: PURPLE_LIGHT, borderColor: "#C4B5FD", color: PURPLE_DARK }
    : { background: "#F5F4FF", borderColor: "#E5E3F5", color: "#888" };
  return (
    <button onClick={onClick} style={{ ...sizes[size], ...colors, display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: 20, border: "1px solid", cursor: onClick ? "pointer" : "default", fontFamily: "inherit", fontWeight: 600, transition: "all 0.15s", whiteSpace: "nowrap", lineHeight: 1.2 }}>{label}</button>
  );
}

function Stars({ rating }) {
  if (!rating) return null;
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
      <span style={{ color: "#FFB800", fontSize: 12 }}>★</span>
      <span style={{ fontSize: 12, fontWeight: 700, color: "#FFB800" }}>{rating.toFixed(1)}</span>
    </span>
  );
}

// ===================== MAP SCREEN =====================
function MapScreen({ cafes, selectedCafe, onMarkerClick }) {
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const mapDivRef = useRef(null);
  const myLocationMarkerRef = useRef(null);

  useEffect(() => {
    if (mapInstanceRef.current || !mapDivRef.current) return;
    const map = new naver.maps.Map(mapDivRef.current, { center: new naver.maps.LatLng(37.5326, 127.0243), zoom: 13 });
    mapInstanceRef.current = map;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const position = new naver.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        map.setCenter(position); map.setZoom(14);
        myLocationMarkerRef.current = new naver.maps.Marker({
          position, map, title: "내 위치",
          icon: { content: `<div style="width:16px;height:16px;background:#4A90E2;border-radius:50%;border:3px solid white;box-shadow:0 0 0 6px rgba(74,144,226,0.2);"></div>`, anchor: new naver.maps.Point(8, 8) },
        });
      }, () => {});
    }
    return () => {
      Object.values(markersRef.current).forEach((m) => m.setMap(null));
      markersRef.current = {};
      if (myLocationMarkerRef.current) myLocationMarkerRef.current.setMap(null);
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    Object.values(markersRef.current).forEach((m) => m.setMap(null));
    markersRef.current = {};
    cafes.forEach((cafe) => {
      if (cafe.lat == null || cafe.lng == null) return;
      const isSelected = selectedCafe?.id === cafe.id;
      const size = isSelected ? 48 : 38;
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(cafe.lat, cafe.lng), map, title: cafe.name,
        icon: {
          content: isSelected
            ? `<div style="display:flex;flex-direction:column;align-items:center;"><div style="width:${size}px;height:${size}px;background:${PURPLE_DARK};border-radius:50%;border:3px solid white;display:flex;align-items:center;justify-content:center;font-size:20px;box-shadow:0 4px 14px rgba(91,79,199,0.5);cursor:pointer;">☕</div><div style="background:#1a1a1a;color:#fff;font-size:10px;font-weight:600;padding:3px 8px;border-radius:6px;margin-top:4px;white-space:nowrap;">${cafe.name}</div></div>`
            : `<div style="width:${size}px;height:${size}px;background:${PURPLE};border-radius:50%;border:2.5px solid white;display:flex;align-items:center;justify-content:center;font-size:16px;box-shadow:0 3px 10px rgba(124,111,205,0.35);cursor:pointer;">☕</div>`,
          anchor: new naver.maps.Point(size / 2, size / 2),
        },
      });
      naver.maps.Event.addListener(marker, "click", () => onMarkerClick(cafe));
      markersRef.current[cafe.id] = marker;
    });
  }, [cafes, selectedCafe]);

  return <div ref={mapDivRef} style={{ width: "100%", height: "100%" }} />;
}

// ===================== APP HEADER =====================
function AppHeader({ favorites, onFavoritesClick }) {
  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 1002, padding: "14px 16px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <div style={{ width: 32, height: 32, background: PURPLE_DARK, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, boxShadow: "0 2px 8px rgba(91,79,199,0.35)" }}>☕</div>
        <span style={{ fontSize: 16, fontWeight: 800, color: "#1a1a1a", letterSpacing: "-0.3px" }}>카공지도</span>
      </div>
      <button onClick={onFavoritesClick} style={{ width: 40, height: 40, borderRadius: "50%", background: favorites.length > 0 ? "#FFF0F3" : "rgba(255,255,255,0.95)", border: favorites.length > 0 ? "1.5px solid #FECDD3" : "1.5px solid #eee", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", position: "relative" }}>
        <span style={{ fontSize: 17, color: favorites.length > 0 ? "#FF4B6E" : "#ccc" }}>{favorites.length > 0 ? "♥" : "♡"}</span>
        {favorites.length > 0 && <span style={{ position: "absolute", top: -4, right: -4, background: PURPLE_DARK, color: "#fff", borderRadius: "50%", width: 16, height: 16, fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{favorites.length}</span>}
      </button>
    </div>
  );
}

// ===================== SEARCH BAR =====================
function SearchBar({ query, onChange, onFilterClick, filterCount }) {
  const searchTimerRef = useRef(null);
  const handleChange = (val) => {
    onChange(val);
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    if (val.trim().length >= 2) searchTimerRef.current = setTimeout(() => track("search", { search_term: val.trim() }), 800);
  };
  return (
    <div style={{ position: "absolute", top: 56, left: 0, right: 0, zIndex: 1000, padding: "8px 16px" }}>
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.97)", borderRadius: 14, padding: "11px 14px", boxShadow: "0 4px 20px rgba(0,0,0,0.12)", border: "1px solid rgba(124,111,205,0.15)" }}>
          <svg width="15" height="15" fill="none" stroke={PURPLE_MID} strokeWidth="2.2" strokeLinecap="round"><circle cx="6.5" cy="6.5" r="5"/><line x1="10" y1="10" x2="14" y2="14"/></svg>
          <input value={query} onChange={e => handleChange(e.target.value)} placeholder="카페 이름 또는 지역 검색" style={{ border: "none", outline: "none", flex: 1, fontSize: 14, color: "#333", background: "transparent", fontFamily: "inherit" }} />
          {query && <button onClick={() => onChange("")} style={{ background: "#eee", border: "none", cursor: "pointer", color: "#999", fontSize: 12, padding: 0, width: 18, height: 18, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>}
        </div>
        <button onClick={() => { track("filter_button_tap"); onFilterClick(); }} style={{ background: filterCount > 0 ? PURPLE_DARK : PURPLE, color: "#fff", border: "none", borderRadius: 14, padding: "11px 16px", cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 12px rgba(91,79,199,0.4)", position: "relative" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 3, marginBottom: 1 }}>
            <div style={{ width: 14, height: 1.5, background: "#fff", borderRadius: 1 }}></div>
            <div style={{ width: 10, height: 1.5, background: "rgba(255,255,255,0.7)", borderRadius: 1, marginLeft: 2 }}></div>
            <div style={{ width: 6, height: 1.5, background: "rgba(255,255,255,0.5)", borderRadius: 1, marginLeft: 4 }}></div>
          </div>
          {filterCount > 0 && <span style={{ position: "absolute", top: -5, right: -5, background: "#FF4757", color: "#fff", borderRadius: "50%", width: 18, height: 18, fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{filterCount}</span>}
        </button>
      </div>
    </div>
  );
}

// ===================== QUICK FILTER BAR =====================
// 단일 태그 필터
const QUICK_FILTERS_SINGLE = [
  { cat: "분위기", val: "카공러 다수", label: "카공러 다수" },
];
// 복합 태그 필터 (버튼 하나로 여러 태그 동시 적용)
const QUICK_FILTERS_MULTI = [
  { label: "콘센트 넉넉/거의 전좌석", tags: [{ cat: "콘센트", val: "넉넉함" }, { cat: "콘센트", val: "거의 전좌석" }] },
];

function QuickFilterBar({ activeFilters, onToggle, onToggleMulti }) {
  const isOn = (cat, val) => (activeFilters[cat] || []).includes(val);
  const isMultiOn = (tags) => tags.some(({ cat, val }) => isOn(cat, val));
  return (
    <div style={{ position: "absolute", top: 112, left: 0, right: 0, zIndex: 999, padding: "0 16px", overflowX: "auto", display: "flex", gap: 7, scrollbarWidth: "none" }} className="no-scroll">
      {QUICK_FILTERS_SINGLE.map(f => {
        const active = isOn(f.cat, f.val);
        return (
          <button key={`${f.cat}-${f.val}`} onClick={() => { track("quick_filter_toggle", { filter_tag: f.label, filter_category: f.cat, action: active ? "off" : "on" }); onToggle(f.cat, f.val); }}
            style={{ background: active ? PURPLE_DARK : "rgba(255,255,255,0.95)", color: active ? "#fff" : "#555", border: active ? `1.5px solid ${PURPLE_DARK}` : "1.5px solid rgba(255,255,255,0.8)", borderRadius: 20, padding: "5px 12px", fontSize: 12, fontWeight: 600, fontFamily: "inherit", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, boxShadow: active ? "0 2px 8px rgba(91,79,199,0.4)" : "0 2px 8px rgba(0,0,0,0.1)", transition: "all 0.15s" }}>{f.label}</button>
        );
      })}
      {QUICK_FILTERS_MULTI.map(f => {
        const active = isMultiOn(f.tags);
        return (
          <button key={f.label} onClick={() => { track("quick_filter_toggle", { filter_tag: f.label, action: active ? "off" : "on" }); onToggleMulti(f.tags, active); }}
            style={{ background: active ? PURPLE_DARK : "rgba(255,255,255,0.95)", color: active ? "#fff" : "#555", border: active ? `1.5px solid ${PURPLE_DARK}` : "1.5px solid rgba(255,255,255,0.8)", borderRadius: 20, padding: "5px 12px", fontSize: 12, fontWeight: 600, fontFamily: "inherit", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, boxShadow: active ? "0 2px 8px rgba(91,79,199,0.4)" : "0 2px 8px rgba(0,0,0,0.1)", transition: "all 0.15s" }}>{f.label}</button>
        );
      })}
    </div>
  );
}

// ===================== FAVORITES SCREEN =====================
function FavoritesScreen({ cafes, favorites, onSelectCafe, onToggleFavorite, onClose }) {
  const favCafes = cafes.filter(c => favorites.includes(c.id));
  useEffect(() => { track("favorites_screen_view", { favorites_count: favCafes.length }); }, []);
  return (
    <div style={{ position: "absolute", inset: 0, background: "#fff", zIndex: 1500, display: "flex", flexDirection: "column", animation: "slideInRight 0.28s ease" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "18px 20px 16px", borderBottom: "1px solid #f0f0f0", position: "sticky", top: 0, background: "#fff", zIndex: 10 }}>
        <button onClick={onClose} style={{ background: "#f5f5f7", border: "none", cursor: "pointer", borderRadius: "50%", width: 34, height: 34, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", color: "#444" }}>←</button>
        <span style={{ fontSize: 17, fontWeight: 800, color: "#1a1a1a" }}>즐겨찾기</span>
        <span style={{ background: PURPLE_LIGHT, color: PURPLE_DARK, borderRadius: 20, padding: "2px 10px", fontSize: 13, fontWeight: 700 }}>{favCafes.length}</span>
      </div>
      <div style={{ overflowY: "auto", flex: 1, padding: "12px 16px 40px" }} className="no-scroll">
        {favCafes.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#ccc" }}>
            <div style={{ fontSize: 52, marginBottom: 14 }}>🤍</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#bbb", marginBottom: 6 }}>아직 즐겨찾기가 없어요</div>
            <div style={{ fontSize: 13, color: "#ddd" }}>카페 상세 페이지에서 ♡ 버튼을 눌러보세요</div>
          </div>
        ) : (
          favCafes.map((cafe, i) => (
            <div key={cafe.id} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "14px 0", borderBottom: i < favCafes.length - 1 ? "1px solid #f5f5f5" : "none", cursor: "pointer" }}
              onClick={() => { track("cafe_click", { cafe_id: cafe.id, cafe_name: cafe.name, source: "favorites" }); onSelectCafe(cafe); onClose(); }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: CARD_GRADIENTS[i % CARD_GRADIENTS.length], flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>☕</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontWeight: 700, fontSize: 15, color: "#1a1a1a" }}>{cafe.name}</span>
                  <button onClick={e => { e.stopPropagation(); onToggleFavorite(cafe.id, cafe.name); }} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, padding: 0, color: "#FF4B6E" }}>♥</button>
                </div>
                <div style={{ fontSize: 12, color: "#bbb", marginBottom: 7, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cafe.address}</div>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                  {[cafe.tags.콘센트, cafe.tags.분위기, cafe.tags.소음].filter(Boolean).map(t => <TagChip key={t} label={t} selected size="sm" />)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ===================== CAFE PREVIEW CARD =====================
function CafePreviewCard({ cafe, cafeIndex, onOpen, onClose, isFavorite, onToggleFavorite }) {
  const topTags = [cafe.tags.콘센트, cafe.tags.분위기, cafe.tags.소음].filter(Boolean);
  const gradient = CARD_GRADIENTS[cafeIndex % CARD_GRADIENTS.length];
  return (
    <div style={{ position: "absolute", bottom: 82, left: 12, right: 12, zIndex: 900, background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.16)", animation: "slideUp 0.25s ease" }}>
      <div style={{ height: 6, background: gradient.replace("linear-gradient(135deg,", "linear-gradient(90deg,") }} />
      <div style={{ padding: "14px 16px 16px" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 14, right: 48, background: "#f5f5f7", border: "none", borderRadius: "50%", width: 28, height: 28, cursor: "pointer", fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "#999" }}>✕</button>
        <button onClick={e => { e.stopPropagation(); onToggleFavorite(cafe.id, cafe.name); }} style={{ position: "absolute", top: 14, right: 14, background: isFavorite ? "#FFF0F3" : "#f5f5f7", border: isFavorite ? "1px solid #FECDD3" : "none", borderRadius: "50%", width: 28, height: 28, cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", color: isFavorite ? "#FF4B6E" : "#ccc" }}>{isFavorite ? "♥" : "♡"}</button>
        <div onClick={() => { track("cafe_detail_view", { cafe_id: cafe.id, cafe_name: cafe.name, source: "preview_card" }); onOpen(); }} style={{ cursor: "pointer", display: "flex", gap: 12 }}>
          <div style={{ width: 58, height: 58, borderRadius: 14, background: gradient, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>☕</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
              <span style={{ fontWeight: 800, fontSize: 16, color: "#1a1a1a" }}>{cafe.name}</span>
              <Stars rating={cafe.rating} />
            </div>
            {cafe.nearStation && <div style={{ fontSize: 11, color: PURPLE_DARK, fontWeight: 600, marginBottom: 5 }}>🚇 {cafe.nearStation} 인근</div>}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>{topTags.map(t => <TagChip key={t} label={t} selected size="sm" />)}</div>
          </div>
        </div>
        {cafe.naverLink && (
          <a href={cafe.naverLink} target="_blank" rel="noopener noreferrer" onClick={() => track("naver_map_open", { cafe_id: cafe.id, cafe_name: cafe.name, source: "preview_card" })}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 12, color: PURPLE_DARK, fontSize: 13, fontWeight: 600, textDecoration: "none", padding: "9px", background: PURPLE_LIGHT, borderRadius: 12 }}>🗺️ 네이버 지도에서 보기 →</a>
        )}
      </div>
    </div>
  );
}

// ===================== CAFE LIST PANEL =====================
function CafeListPanel({ cafes, onSelectCafe, filterCount, searchQuery }) {
  const [expanded, setExpanded] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const listRef = useRef(null);
  useEffect(() => {
    if (filterCount > 0 || searchQuery) setExpanded(true);
    else setExpanded(false);
  }, [filterCount, searchQuery]);
  const sortedCafes = [...cafes].sort((a, b) => sortBy === "rating" ? (b.rating || 0) - (a.rating || 0) : 0);
  return (
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 850, background: "#fff", borderRadius: "20px 20px 0 0", boxShadow: "0 -4px 24px rgba(0,0,0,0.10)", transition: "height 0.35s cubic-bezier(0.4,0,0.2,1)", height: expanded ? "55vh" : 68, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div onClick={() => setExpanded(e => !e)} style={{ padding: "12px 18px 10px", cursor: "pointer", flexShrink: 0 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
          <div style={{ width: 32, height: 4, borderRadius: 2, background: "#E5E3F5", marginBottom: 10 }} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 15, fontWeight: 800, color: "#1a1a1a" }}>카공카페</span>
              <span style={{ background: PURPLE_LIGHT, color: PURPLE_DARK, borderRadius: 20, padding: "2px 10px", fontSize: 12, fontWeight: 700 }}>{cafes.length}곳</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {expanded && (
                <select value={sortBy} onChange={e => { e.stopPropagation(); setSortBy(e.target.value); }} onClick={e => e.stopPropagation()}
                  style={{ fontSize: 11, color: "#888", background: "#f5f5f7", border: "none", borderRadius: 8, padding: "4px 8px", fontFamily: "inherit", cursor: "pointer", outline: "none" }}>
                  <option value="default">기본순</option>
                  <option value="rating">별점순</option>
                </select>
              )}
              <span style={{ fontSize: 13, color: "#bbb", transition: "transform 0.3s", display: "inline-block", transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}>▲</span>
            </div>
          </div>
        </div>
      </div>
      <div ref={listRef} style={{ overflowY: "auto", flex: 1, padding: "0 16px 32px" }} className="no-scroll">
        {sortedCafes.length === 0 ? (
          <div style={{ textAlign: "center", padding: "36px 0", color: "#ccc" }}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>🔍</div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>조건에 맞는 카페가 없어요</div>
          </div>
        ) : (
          sortedCafes.map((cafe, i) => (
            <div key={cafe.id} onClick={() => { track("cafe_click", { cafe_id: cafe.id, cafe_name: cafe.name, source: "list" }); onSelectCafe(cafe); setExpanded(false); }}
              style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "13px 0", borderBottom: i < sortedCafes.length - 1 ? "1px solid #f0f0f4" : "none", cursor: "pointer" }}>
              <div style={{ width: 50, height: 50, borderRadius: 13, background: CARD_GRADIENTS[i % CARD_GRADIENTS.length], flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, position: "relative" }}>
                ☕
                {cafe.rating >= 4.8 && <div style={{ position: "absolute", bottom: -2, right: -2, width: 14, height: 14, background: "#FFB800", borderRadius: "50%", border: "1.5px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, fontWeight: 800, color: "#fff" }}>★</div>}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 3 }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: "#1a1a1a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cafe.name}</span>
                  <Stars rating={cafe.rating} />
                </div>
                <div style={{ fontSize: 11, color: "#bbb", marginBottom: 6, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cafe.nearStation ? `🚇 ${cafe.nearStation} · ` : ""}{cafe.address}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {[cafe.tags.콘센트, cafe.tags.분위기, cafe.tags.소음].filter(Boolean).map(t => <TagChip key={t} label={t} selected size="sm" />)}
                </div>
              </div>
              <span style={{ fontSize: 16, color: "#d0cde8", flexShrink: 0, alignSelf: "center" }}>›</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ===================== FILTER MODAL =====================
function FilterModal({ activeFilters, onApply, onClose }) {
  const [local, setLocal] = useState(JSON.parse(JSON.stringify(activeFilters)));
  const toggle = (cat, tag) => { setLocal(prev => { const arr = [...(prev[cat] || [])]; const idx = arr.indexOf(tag); if (idx >= 0) arr.splice(idx, 1); else arr.push(tag); return { ...prev, [cat]: arr }; }); };
  const isOn = (cat, tag) => (local[cat] || []).includes(tag);
  const totalSelected = Object.values(local).flat().length;
  const reset = () => setLocal(Object.fromEntries(Object.keys(FILTER_CATEGORIES).map(k => [k, []])));
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 2000, display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, background: "rgba(0,0,0,0.45)", animation: "fadeIn 0.2s" }} onClick={onClose} />
      <div style={{ background: "#fff", borderRadius: "24px 24px 0 0", maxHeight: "82vh", display: "flex", flexDirection: "column", animation: "slideUpFull 0.3s ease" }}>
        <div style={{ padding: "20px 20px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 19, fontWeight: 800, color: "#1a1a1a" }}>필터</span>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {totalSelected > 0 && <button onClick={reset} style={{ background: PURPLE_LIGHT, border: "none", cursor: "pointer", color: PURPLE_DARK, fontSize: 13, fontWeight: 600, fontFamily: "inherit", borderRadius: 8, padding: "5px 12px" }}>초기화</button>}
              <button onClick={onClose} style={{ background: "#f5f5f7", border: "none", cursor: "pointer", color: "#555", fontSize: 18, width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
            </div>
          </div>
        </div>
        <div style={{ overflowY: "auto", flex: 1, padding: "0 20px" }} className="no-scroll">
          {Object.entries(FILTER_CATEGORIES).map(([cat, tags]) => (
            <div key={cat} style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#888", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>{cat}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{tags.map(tag => <TagChip key={tag} label={tag} selected={isOn(cat, tag)} onClick={() => toggle(cat, tag)} />)}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: "14px 20px 40px" }}>
          <button onClick={() => { const t = Object.entries(local).flatMap(([c, v]) => (v || []).map(x => `${c}:${x}`)); track("filter_apply", { filter_tags: t.join(","), filter_count: t.length }); onApply(local); }}
            style={{ width: "100%", padding: "16px", background: totalSelected > 0 ? PURPLE_DARK : PURPLE, color: "#fff", border: "none", borderRadius: 16, fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 14px rgba(91,79,199,0.4)" }}>
            {totalSelected > 0 ? `필터 적용 (${totalSelected})` : "적용하기"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ===================== CAFE DETAIL =====================
function CafeDetail({ cafe, cafeIndex, onBack, onWriteReview, onLike, isFavorite, onToggleFavorite }) {
  const [dbReviews, setDbReviews] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [editingReview, setEditingReview] = useState(null); // 수정 중인 리뷰

  const tagRows = [{ label: "콘센트", val: cafe.tags.콘센트 }, { label: "분위기", val: cafe.tags.분위기 }, { label: "소음", val: cafe.tags.소음 }].filter(r => r.val);
  const tagArrayRows = [{ label: "공간", val: cafe.tags.공간 }, { label: "테이블", val: cafe.tags.테이블 }, { label: "메뉴", val: cafe.tags.메뉴 }].filter(r => r.val && r.val.length > 0);
  const gradient = CARD_GRADIENTS[cafeIndex % CARD_GRADIENTS.length];

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/reviews/${cafe.id}`);
      const data = await res.json();
      setDbReviews(Array.isArray(data) ? data : []);
    } catch (e) { setDbReviews([]); }
  };

  useEffect(() => {
    track("cafe_detail_view", { cafe_id: cafe.id, cafe_name: cafe.name, cafe_rating: cafe.rating });
    fetchReviews();
  }, [cafe.id]);

  const handleDeleteReview = async (reviewId) => {
    if (!confirm("이 리뷰를 삭제할까요?")) return;
    setDeletingId(reviewId);
    try {
      const res = await fetch(`${BACKEND_URL}/api/reviews/${reviewId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: SESSION_ID }),
      });
      const data = await res.json();
      if (data.ok) {
        track("review_delete", { cafe_id: cafe.id, cafe_name: cafe.name });
        setDbReviews(prev => prev.filter(r => r.id !== reviewId));
      } else { alert(data.error || "삭제할 수 없어요"); }
    } catch (e) { alert("삭제 중 오류가 발생했어요"); }
    finally { setDeletingId(null); }
  };

  const handleLikeReview = async (reviewId) => {
    const key = `liked_review_${reviewId}`;
    if (localStorage.getItem(key)) return;
    try {
      const res = await fetch(`${BACKEND_URL}/api/reviews/${reviewId}/like`, { method: "PATCH" });
      const data = await res.json();
      if (data.ok) {
        localStorage.setItem(key, "1");
        setDbReviews(prev => prev.map(r => r.id === reviewId ? { ...r, likes: data.likes } : r));
        onLike(cafe.id, reviewId);
      }
    } catch (e) {}
  };

  const ownerReviews = cafe.reviews.filter(r => r.isOwner);
  const userReviews = dbReviews === null ? [] : dbReviews.filter(r => !r.is_owner);

  // 수정 모달이 열려있을 때
  if (editingReview) {
    return (
      <EditReview
        cafe={cafe}
        review={editingReview}
        onBack={() => setEditingReview(null)}
        onSaved={(updated) => {
          setDbReviews(prev => prev.map(r => r.id === updated.id ? updated : r));
          setEditingReview(null);
        }}
      />
    );
  }

  return (
    <div style={{ position: "absolute", inset: 0, background: "#fff", zIndex: 1500, overflowY: "auto", animation: "slideInRight 0.28s ease" }} className="no-scroll">
      <div style={{ position: "relative", width: "100%", height: 200, background: gradient, flexShrink: 0 }}>
        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64, opacity: 0.6 }}>☕</div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(255,255,255,0.6) 0%, transparent 60%)" }} />
        <button onClick={onBack} style={{ position: "absolute", top: 16, left: 16, width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,0.9)", border: "none", cursor: "pointer", fontSize: 18, boxShadow: "0 2px 12px rgba(0,0,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
        <button onClick={() => onToggleFavorite(cafe.id, cafe.name)} style={{ position: "absolute", top: 16, right: 16, width: 38, height: 38, borderRadius: "50%", background: isFavorite ? "#FFF0F3" : "rgba(255,255,255,0.9)", border: isFavorite ? "1.5px solid #FECDD3" : "none", cursor: "pointer", fontSize: 19, boxShadow: "0 2px 12px rgba(0,0,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: isFavorite ? "#FF4B6E" : "#ccc" }}>{isFavorite ? "♥" : "♡"}</button>
      </div>

      <div style={{ padding: "20px 20px 100px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 4 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#1a1a1a", letterSpacing: "-0.3px" }}>{cafe.name}</h1>
          <Stars rating={cafe.rating} />
        </div>
        <p style={{ fontSize: 13, color: "#bbb", marginBottom: 5 }}>{cafe.address}</p>
        {cafe.nearStation && <p style={{ fontSize: 12, color: PURPLE_DARK, marginBottom: 16, fontWeight: 600 }}>🚇 {cafe.nearStation} 인근</p>}
        {!cafe.nearStation && <div style={{ marginBottom: 16 }} />}

        {cafe.naverLink && (
          <a href={cafe.naverLink} target="_blank" rel="noopener noreferrer" onClick={() => track("naver_map_open", { cafe_id: cafe.id, cafe_name: cafe.name, source: "detail" })}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "11px", background: PURPLE_LIGHT, borderRadius: 14, color: PURPLE_DARK, fontSize: 14, fontWeight: 700, textDecoration: "none", marginBottom: 16 }}>🗺️ 네이버 지도에서 보기</a>
        )}

        <div style={{ background: "#fafafe", borderRadius: 14, padding: "14px 16px", marginBottom: 22, borderLeft: `3px solid ${PURPLE}` }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: PURPLE_MID, marginBottom: 6 }}>OWNER'S NOTE</div>
          <p style={{ fontSize: 13, color: "#555", lineHeight: 1.75 }}>"{cafe.ownerComment}"</p>
        </div>

        <div style={{ background: "#f9f9fb", borderRadius: 16, padding: "16px", marginBottom: 20 }}>
          {tagRows.map(({ label, val }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <span style={{ fontSize: 12, color: "#bbb", width: 44, flexShrink: 0, fontWeight: 600 }}>{label}</span>
              <TagChip label={val} selected size="sm" />
            </div>
          ))}
          {tagArrayRows.map(({ label, val }) => (
            <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 10 }}>
              <span style={{ fontSize: 12, color: "#bbb", width: 44, flexShrink: 0, fontWeight: 600, paddingTop: 5 }}>{label}</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{val.map(t => <TagChip key={t} label={t} selected size="sm" />)}</div>
            </div>
          ))}
        </div>

        <div style={{ height: 1, background: "#f0f0f4", margin: "20px 0" }} />

        {ownerReviews.map((rev, i) => (
          <div key={`owner-${i}`} style={{ marginBottom: 22 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#1a1a1a", marginBottom: 12 }}>오늘도 카공중인 주인장 리뷰</div>
            <div style={{ background: "#fafafe", borderRadius: 14, padding: "16px", display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: PURPLE_LIGHT, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>☕</div>
              <p style={{ fontSize: 14, color: "#444", lineHeight: 1.75 }}>{rev.text}</p>
            </div>
          </div>
        ))}

        <div style={{ height: 1, background: "#f0f0f4", margin: "4px 0 20px" }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span style={{ fontSize: 14, fontWeight: 800, color: "#1a1a1a" }}>
            카공러들의 리뷰 <span style={{ color: PURPLE_DARK }}>{userReviews.length}</span>
          </span>
          <button onClick={() => { track("review_start", { cafe_id: cafe.id, cafe_name: cafe.name }); onWriteReview(); }}
            style={{ background: PURPLE_DARK, color: "#fff", border: "none", borderRadius: 10, padding: "7px 15px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 2px 8px rgba(91,79,199,0.35)" }}>리뷰 쓰기</button>
        </div>

        {dbReviews === null && <div style={{ textAlign: "center", padding: "24px 0", color: "#bbb", fontSize: 13 }}>리뷰 불러오는 중...</div>}
        {dbReviews !== null && userReviews.length === 0 && (
          <div style={{ textAlign: "center", padding: "36px 0", color: "#ccc", fontSize: 14 }}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>☕</div>
            첫 번째 리뷰를 남겨보세요!
          </div>
        )}

        {userReviews.map((rev, i, arr) => {
          const isMyReview = rev.session_id === SESSION_ID;
          const isLiked = !!localStorage.getItem(`liked_review_${rev.id}`);
          return (
            <div key={rev.id} style={{ paddingBottom: 20, marginBottom: 20, borderBottom: i < arr.length - 1 ? "1px solid #f5f5f5" : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a" }}>{rev.user_name}</span>
                  {isMyReview && <span style={{ fontSize: 10, background: PURPLE_LIGHT, color: PURPLE_DARK, borderRadius: 20, padding: "2px 7px", fontWeight: 600 }}>내 리뷰</span>}
                  {rev.is_edited && <span style={{ fontSize: 10, color: "#bbb" }}>(수정됨)</span>}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 12, color: "#bbb" }}>{new Date(rev.created_at).toLocaleDateString("ko-KR")}</span>
                  {isMyReview && (
                    <>
                      {/* 수정 버튼 */}
                      <button onClick={() => setEditingReview(rev)}
                        style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: PURPLE_DARK, fontFamily: "inherit", padding: "2px 6px", borderRadius: 6, fontWeight: 600 }}>수정</button>
                      {/* 삭제 버튼 */}
                      <button onClick={() => handleDeleteReview(rev.id)} disabled={deletingId === rev.id}
                        style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "#FF4757", fontFamily: "inherit", padding: "2px 6px", borderRadius: 6, fontWeight: 600, opacity: deletingId === rev.id ? 0.5 : 1 }}>
                        {deletingId === rev.id ? "삭제 중..." : "삭제"}
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 9 }}>
                {(rev.tags || []).map(t => <TagChip key={t} label={t} selected size="sm" />)}
              </div>
              <p style={{ fontSize: 14, color: "#444", lineHeight: 1.7, marginBottom: 10 }}>{rev.text}</p>
              <button onClick={() => handleLikeReview(rev.id)}
                style={{ display: "flex", alignItems: "center", gap: 5, background: isLiked ? PURPLE_LIGHT : "#f5f5f7", border: "none", borderRadius: 20, cursor: isLiked ? "default" : "pointer", fontSize: 12, fontFamily: "inherit", padding: "5px 10px", color: isLiked ? PURPLE_DARK : "#bbb", fontWeight: 600, transition: "all 0.15s" }}>
                👍 {rev.likes || 0}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ===================== EDIT REVIEW — 리뷰 수정 =====================
function EditReview({ cafe, review, onBack, onSaved }) {
  const [selected, setSelected] = useState(() => {
    const obj = {};
    if (review.tags) {
      Object.entries(FILTER_CATEGORIES).forEach(([cat, tags]) => {
        const matched = tags.filter(t => review.tags.includes(t));
        if (matched.length > 0) obj[cat] = matched;
      });
    }
    return obj;
  });
  const [text, setText] = useState(review.text || "");
  const [nickname, setNickname] = useState(review.user_name || getNickname() || "");
  const [loading, setLoading] = useState(false);

  const toggle = (cat, tag) => {
    setSelected(prev => {
      const arr = [...(prev[cat] || [])];
      const idx = arr.indexOf(tag);
      if (idx >= 0) arr.splice(idx, 1); else arr.push(tag);
      return { ...prev, [cat]: arr };
    });
  };
  const isOn = (cat, tag) => (selected[cat] || []).includes(tag);

  const handleSave = async () => {
    if (!text.trim()) { alert("한줄평을 입력해주세요"); return; }
    if (!nickname.trim()) { alert("닉네임을 입력해주세요"); return; }
    setLoading(true);
    const allTags = Object.values(selected).flat();
    try {
      const res = await fetch(`${BACKEND_URL}/api/reviews/${review.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: SESSION_ID,
          tags: allTags,
          text: text.trim(),
          user_name: nickname.trim(),
        }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);
      saveNickname(nickname.trim());
      track("review_edit", { cafe_id: cafe.id, cafe_name: cafe.name });
      onSaved(data.review);
    } catch (e) {
      alert("수정 중 오류가 발생했어요. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "absolute", inset: 0, background: "#fff", zIndex: 2000, overflowY: "auto", animation: "slideInRight 0.28s ease" }} className="no-scroll">
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "18px 20px 16px", borderBottom: "1px solid #f0f0f4", position: "sticky", top: 0, background: "#fff", zIndex: 10 }}>
        <button onClick={onBack} style={{ background: "#f5f5f7", border: "none", cursor: "pointer", borderRadius: "50%", width: 34, height: 34, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", color: "#444" }}>←</button>
        <span style={{ fontSize: 17, fontWeight: 800 }}>리뷰 수정</span>
      </div>
      <div style={{ padding: "22px 20px 120px" }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 4, color: "#1a1a1a" }}>{cafe.name}</h2>
        <p style={{ fontSize: 13, color: "#bbb", marginBottom: 24 }}>내용을 수정하고 저장해주세요</p>

        {/* 닉네임 */}
        <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 10, color: "#1a1a1a" }}>닉네임</div>
        <input value={nickname} onChange={e => setNickname(e.target.value)} placeholder="닉네임을 입력하세요" maxLength={20}
          style={{ width: "100%", border: `1.5px solid ${nickname ? PURPLE : "#E5E3F5"}`, borderRadius: 12, padding: "11px 14px", fontSize: 14, fontFamily: "inherit", outline: "none", color: "#333", background: "#fafafe", marginBottom: 20 }}
          onFocus={e => e.target.style.borderColor = PURPLE}
          onBlur={e => e.target.style.borderColor = nickname ? PURPLE : "#E5E3F5"} />

        {/* 키워드 */}
        <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 16, color: "#1a1a1a" }}>키워드 수정</div>
        {Object.entries(FILTER_CATEGORIES).map(([cat, tags]) => (
          <div key={cat} style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#aaa", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>{cat}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {tags.map(tag => <TagChip key={tag} label={tag} selected={isOn(cat, tag)} onClick={() => toggle(cat, tag)} />)}
            </div>
          </div>
        ))}

        <div style={{ height: 1, background: "#f0f0f4", margin: "8px 0 22px" }} />

        {/* 한줄평 */}
        <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 12, color: "#1a1a1a" }}>한줄평 수정</div>
        <textarea value={text} onChange={e => setText(e.target.value)} placeholder="카공 경험을 자유롭게 적어주세요" maxLength={100}
          style={{ width: "100%", minHeight: 90, border: `1.5px solid ${text ? PURPLE : "#E5E3F5"}`, borderRadius: 14, padding: "12px 14px", fontSize: 14, fontFamily: "inherit", resize: "none", outline: "none", color: "#333", background: "#fafafe", lineHeight: 1.7, transition: "border-color 0.15s" }}
          onFocus={e => e.target.style.borderColor = PURPLE}
          onBlur={e => e.target.style.borderColor = text ? PURPLE : "#E5E3F5"} />
        <div style={{ textAlign: "right", fontSize: 12, color: "#ccc", marginTop: 4 }}>{text.length}/100</div>
      </div>
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, padding: "12px 20px 36px", background: "#fff", borderTop: "1px solid #f0f0f4" }}>
        <button onClick={handleSave} disabled={loading}
          style={{ width: "100%", padding: "15px", background: loading ? "#aaa" : PURPLE_DARK, color: "#fff", border: "none", borderRadius: 16, fontSize: 16, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit", boxShadow: "0 4px 14px rgba(91,79,199,0.4)" }}>
          {loading ? "저장 중..." : "수정 완료"}
        </button>
      </div>
    </div>
  );
}

// ===================== WRITE REVIEW — 리뷰 작성 =====================
function WriteReview({ cafe, onBack, onSubmit }) {
  const [selected, setSelected] = useState({});
  const [text, setText] = useState("");
  // 저장된 닉네임 있으면 자동 입력
  const [nickname, setNickname] = useState(getNickname);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggle = (cat, tag) => { setSelected(prev => { const arr = [...(prev[cat] || [])]; const idx = arr.indexOf(tag); if (idx >= 0) arr.splice(idx, 1); else arr.push(tag); return { ...prev, [cat]: arr }; }); };
  const isOn = (cat, tag) => (selected[cat] || []).includes(tag);

  const submit = async () => {
    if (!nickname.trim()) { alert("닉네임을 입력해주세요"); return; }
    if (!text.trim()) { alert("한줄평을 입력해주세요"); return; }
    setLoading(true);
    const allTags = Object.values(selected).flat();
    try {
      const res = await fetch(`${BACKEND_URL}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cafe_id: cafe.id, cafe_name: cafe.name,
          user_name: nickname.trim(),
          tags: allTags, text: text.trim(),
          session_id: SESSION_ID, is_owner: false,
        }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);
      saveNickname(nickname.trim()); // 닉네임 로컬에 저장
      track("review_submit", { cafe_id: cafe.id, cafe_name: cafe.name, tags_count: allTags.length, text_length: text.length });
      setDone(true);
      setTimeout(() => onSubmit(selected, text), 1400);
    } catch (e) {
      alert("리뷰 등록 중 오류가 발생했어요.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div style={{ position: "absolute", inset: 0, background: "#fff", zIndex: 2000, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, animation: "fadeIn 0.3s" }}>
        <div style={{ fontSize: 60 }}>🎉</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: "#1a1a1a" }}>리뷰가 등록됐어요!</div>
        <div style={{ fontSize: 14, color: "#bbb" }}>소중한 카공 후기 감사합니다 ☕</div>
      </div>
    );
  }

  return (
    <div style={{ position: "absolute", inset: 0, background: "#fff", zIndex: 2000, overflowY: "auto", animation: "slideInRight 0.28s ease" }} className="no-scroll">
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "18px 20px 16px", borderBottom: "1px solid #f0f0f4", position: "sticky", top: 0, background: "#fff", zIndex: 10 }}>
        <button onClick={onBack} style={{ background: "#f5f5f7", border: "none", cursor: "pointer", borderRadius: "50%", width: 34, height: 34, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", color: "#444" }}>←</button>
        <span style={{ fontSize: 17, fontWeight: 800 }}>리뷰 쓰기</span>
      </div>
      <div style={{ padding: "22px 20px 120px" }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 4, color: "#1a1a1a" }}>{cafe.name}</h2>
        <p style={{ fontSize: 13, color: "#bbb", marginBottom: 24 }}>이 카페에 대한 솔직한 리뷰를 남겨주세요 ☕</p>

        {/* ★ 닉네임 입력 */}
        <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 10, color: "#1a1a1a" }}>
          닉네임
          {getNickname() && <span style={{ fontSize: 11, color: "#bbb", fontWeight: 400, marginLeft: 8 }}>이전에 사용한 닉네임이 자동 입력됐어요</span>}
        </div>
        <input value={nickname} onChange={e => setNickname(e.target.value)} placeholder="닉네임을 입력하세요 (최대 20자)" maxLength={20}
          style={{ width: "100%", border: `1.5px solid ${nickname ? PURPLE : "#E5E3F5"}`, borderRadius: 12, padding: "11px 14px", fontSize: 14, fontFamily: "inherit", outline: "none", color: "#333", background: "#fafafe", marginBottom: 24 }}
          onFocus={e => e.target.style.borderColor = PURPLE}
          onBlur={e => e.target.style.borderColor = nickname ? PURPLE : "#E5E3F5"} />

        <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 16, color: "#1a1a1a" }}>키워드 선택</div>
        {Object.entries(FILTER_CATEGORIES).map(([cat, tags]) => (
          <div key={cat} style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#aaa", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>{cat}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{tags.map(tag => <TagChip key={tag} label={tag} selected={isOn(cat, tag)} onClick={() => toggle(cat, tag)} />)}</div>
          </div>
        ))}

        <div style={{ height: 1, background: "#f0f0f4", margin: "8px 0 22px" }} />

        <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 12, color: "#1a1a1a" }}>한줄평</div>
        <textarea value={text} onChange={e => setText(e.target.value)} placeholder="카공 경험을 자유롭게 적어주세요" maxLength={100}
          style={{ width: "100%", minHeight: 90, border: `1.5px solid ${text ? PURPLE : "#E5E3F5"}`, borderRadius: 14, padding: "12px 14px", fontSize: 14, fontFamily: "inherit", resize: "none", outline: "none", color: "#333", background: "#fafafe", lineHeight: 1.7, transition: "border-color 0.15s" }}
          onFocus={e => e.target.style.borderColor = PURPLE}
          onBlur={e => e.target.style.borderColor = text ? PURPLE : "#E5E3F5"} />
        <div style={{ textAlign: "right", fontSize: 12, color: "#ccc", marginTop: 4 }}>{text.length}/100</div>
      </div>
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, padding: "12px 20px 36px", background: "#fff", borderTop: "1px solid #f0f0f4" }}>
        <button onClick={submit} disabled={loading}
          style={{ width: "100%", padding: "15px", background: loading ? "#aaa" : PURPLE_DARK, color: "#fff", border: "none", borderRadius: 16, fontSize: 16, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit", boxShadow: "0 4px 14px rgba(91,79,199,0.4)" }}>
          {loading ? "등록 중..." : "등록하기"}
        </button>
      </div>
    </div>
  );
}

// ===================== APP =====================
function App() {
  const [screen, setScreen] = useState("map");
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [selectedCafeIndex, setSelectedCafeIndex] = useState(0);
  const [showFilter, setShowFilter] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [likedReviews, setLikedReviews] = useState({});
  const [cafes] = useState(CAFES);
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('kagong_favorites') || '[]'); } catch { return []; }
  });
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => { track("app_open"); }, []);

  const toggleFavorite = useCallback((cafeId, cafeName) => {
    setFavorites(prev => {
      const isAdding = !prev.includes(cafeId);
      const next = isAdding ? [...prev, cafeId] : prev.filter(id => id !== cafeId);
      localStorage.setItem('kagong_favorites', JSON.stringify(next));
      track(isAdding ? "favorite_add" : "favorite_remove", { cafe_id: cafeId, cafe_name: cafeName || cafeId });
      return next;
    });
  }, []);

  const handleQuickFilterToggle = (cat, val) => {
    setActiveFilters(prev => { const arr = [...(prev[cat] || [])]; const idx = arr.indexOf(val); if (idx >= 0) arr.splice(idx, 1); else arr.push(val); return { ...prev, [cat]: arr }; });
  };

  const handleQuickFilterMultiToggle = (tags, currentlyOn) => {
    setActiveFilters(prev => {
      const next = { ...prev };
      if (currentlyOn) {
        tags.forEach(({ cat, val }) => { next[cat] = (next[cat] || []).filter(v => v !== val); });
      } else {
        tags.forEach(({ cat, val }) => { const arr = [...(next[cat] || [])]; if (!arr.includes(val)) arr.push(val); next[cat] = arr; });
      }
      return next;
    });
  };

  const filterCount = Object.values(activeFilters).flat().length;

  const filteredCafes = cafes.filter(cafe => {
    if (searchQuery) { const q = searchQuery.toLowerCase(); if (!cafe.name.toLowerCase().includes(q) && !cafe.address.toLowerCase().includes(q)) return false; }
    for (const [cat, vals] of Object.entries(activeFilters)) {
      if (!vals || vals.length === 0) continue;
      const cafeTags = cafe.tags[cat];
      if (!cafeTags) return false;
      const arr = Array.isArray(cafeTags) ? cafeTags : [cafeTags];
      if (!vals.some(v => arr.includes(v))) return false;
    }
    return true;
  });

  const handleMarkerClick = useCallback(cafe => {
    const idx = CAFES.findIndex(c => c.id === cafe.id);
    setSelectedCafe(cafe); setSelectedCafeIndex(idx >= 0 ? idx : 0);
    track("cafe_click", { cafe_id: cafe.id, cafe_name: cafe.name, source: "map_marker" });
  }, []);

  const handleSelectCafe = (cafe) => {
    const idx = CAFES.findIndex(c => c.id === cafe.id);
    setSelectedCafe(cafe); setSelectedCafeIndex(idx >= 0 ? idx : 0);
  };

  const handleApplyFilter = filters => { setActiveFilters(filters); setShowFilter(false); };
  const handleLike = (cafeId, reviewId) => { setLikedReviews(prev => ({ ...prev, [`${cafeId}-${reviewId}`]: true })); };
  const handleReviewSubmit = () => { setTimeout(() => setScreen("detail"), 1500); };

  return (
    <div className="app-shell">
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <div style={{ width: "100%", height: "100%" }}>
          <MapScreen cafes={filteredCafes} selectedCafe={selectedCafe} onMarkerClick={handleMarkerClick} />
        </div>
        {screen === "map" && <AppHeader favorites={favorites} onFavoritesClick={() => setShowFavorites(true)} />}
        {screen === "map" && <SearchBar query={searchQuery} onChange={setSearchQuery} onFilterClick={() => setShowFilter(true)} filterCount={filterCount} />}
        {screen === "map" && <QuickFilterBar activeFilters={activeFilters} onToggle={handleQuickFilterToggle} onToggleMulti={handleQuickFilterMultiToggle} />}
        {screen === "map" && <CafeListPanel cafes={filteredCafes} onSelectCafe={handleSelectCafe} filterCount={filterCount} searchQuery={searchQuery} />}
        {screen === "map" && selectedCafe && (
          <CafePreviewCard cafe={selectedCafe} cafeIndex={selectedCafeIndex} onOpen={() => setScreen("detail")} onClose={() => setSelectedCafe(null)} isFavorite={favorites.includes(selectedCafe.id)} onToggleFavorite={toggleFavorite} />
        )}
        {showFavorites && (
          <FavoritesScreen cafes={cafes} favorites={favorites} onSelectCafe={(cafe) => { handleSelectCafe(cafe); setScreen("detail"); setShowFavorites(false); }} onToggleFavorite={toggleFavorite} onClose={() => setShowFavorites(false)} />
        )}
        {screen === "detail" && selectedCafe && (
          <CafeDetail cafe={cafes.find(c => c.id === selectedCafe.id) || selectedCafe} cafeIndex={selectedCafeIndex} onBack={() => setScreen("map")} onWriteReview={() => setScreen("review")} onLike={handleLike} isFavorite={favorites.includes(selectedCafe.id)} onToggleFavorite={toggleFavorite} />
        )}
        {screen === "review" && selectedCafe && (
          <WriteReview cafe={selectedCafe} onBack={() => setScreen("detail")} onSubmit={handleReviewSubmit} />
        )}
        {showFilter && (
          <FilterModal activeFilters={activeFilters} onApply={handleApplyFilter} onClose={() => setShowFilter(false)} />
        )}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
