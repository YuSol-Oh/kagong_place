const { useState, useEffect, useRef, useCallback } = React;

// ===================== CONSTANTS =====================
const PURPLE = "#7C6FCD";
const PURPLE_LIGHT = "#f0eeff";
const PURPLE_DARK = "#5B4FC7";

// ===================== TAG CHIP =====================
function TagChip({ label, selected, onClick, size = "md" }) {
  const sizes = { sm: { fontSize: 12, padding: "4px 10px" }, md: { fontSize: 14, padding: "7px 14px" } };
  const colors = selected
    ? { background: PURPLE, borderColor: PURPLE, color: "#fff" }
    : { background: "#fff", borderColor: PURPLE, color: PURPLE };
  return (
    <button onClick={onClick} style={{
      ...sizes[size], ...colors,
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      borderRadius: 20, border: "1.5px solid", cursor: onClick ? "pointer" : "default",
      fontFamily: "inherit", fontWeight: 500, transition: "all 0.15s", whiteSpace: "nowrap",
      lineHeight: 1.2
    }}>{label}</button>
  );
}

// ===================== 길찾기 URL 생성 =====================

function Stars({ rating }) {
  if (!rating) return null;
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
      <span style={{ color: "#FFB800", fontSize: 13 }}>★</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>{rating.toFixed(1)}</span>
    </span>
  );
}

// ===================== MAP SCREEN (Leaflet / OpenStreetMap) =====================
function MapScreen({ cafes, selectedCafe, onMarkerClick }) {
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const mapDivRef = useRef(null);
  const myLocationMarkerRef = useRef(null);

  useEffect(() => {
    if (mapInstanceRef.current || !mapDivRef.current) return;

    const map = new naver.maps.Map(mapDivRef.current, {
      center: new naver.maps.LatLng(37.5326, 127.0243),
      zoom: 13,
    });

    mapInstanceRef.current = map;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          const position = new naver.maps.LatLng(lat, lng);

          map.setCenter(position);
          map.setZoom(14);

          myLocationMarkerRef.current = new naver.maps.Marker({
            position,
            map,
            title: "내 위치",
            icon: {
              content: `
                <div style="
                  width:16px;
                  height:16px;
                  background:#4A90E2;
                  border-radius:50%;
                  border:3px solid white;
                  box-shadow:0 0 0 5px rgba(74,144,226,0.22);
                "></div>
              `,
              anchor: new naver.maps.Point(8, 8),
            },
          });
        },
        () => {}
      );
    }

    return () => {
      Object.values(markersRef.current).forEach((m) => m.setMap(null));
      markersRef.current = {};
      if (myLocationMarkerRef.current) {
        myLocationMarkerRef.current.setMap(null);
      }
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
      const size = isSelected ? 44 : 36;

      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(cafe.lat, cafe.lng),
        map,
        title: cafe.name,
        icon: {
          content: `
            <div style="
              width:${size}px;
              height:${size}px;
              background:${isSelected ? PURPLE_DARK : PURPLE};
              border-radius:50%;
              display:flex;
              align-items:center;
              justify-content:center;
              color:white;
              font-size:${isSelected ? 20 : 16}px;
              box-shadow:0 3px 10px rgba(124,111,205,0.35);
              border:${isSelected ? "3px" : "2px"} solid white;
              cursor:pointer;
            ">📍</div>
          `,
          anchor: new naver.maps.Point(size / 2, size / 2),
        },
      });

      naver.maps.Event.addListener(marker, "click", () => {
        onMarkerClick(cafe);
      });

      markersRef.current[cafe.id] = marker;
    });
  }, [cafes, selectedCafe]);

  return <div ref={mapDivRef} style={{ width: "100%", height: "100%" }} />;
}

// ===================== SEARCH BAR =====================
function SearchBar({ query, onChange, onFilterClick, filterCount }) {
  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 1000, padding: "12px 16px", display: "flex", gap: 8 }}>
      <div style={{
        flex: 1, display: "flex", alignItems: "center", gap: 8,
        background: "#fff", borderRadius: 12, padding: "10px 14px",
        boxShadow: "0 2px 16px rgba(0,0,0,0.13)"
      }}>
        <svg width="16" height="16" fill="none" stroke="#bbb" strokeWidth="2.2" strokeLinecap="round"><circle cx="7" cy="7" r="5"/><line x1="11" y1="11" x2="15" y2="15"/></svg>
        <input value={query} onChange={e => onChange(e.target.value)}
          placeholder="카페 이름이나 지역을 검색하세요"
          style={{ border: "none", outline: "none", flex: 1, fontSize: 14, color: "#333", background: "transparent", fontFamily: "inherit" }} />
        {query && <button onClick={() => onChange("")} style={{ background: "none", border: "none", cursor: "pointer", color: "#bbb", fontSize: 16, padding: 0, lineHeight: 1 }}>✕</button>}
      </div>
      <button onClick={onFilterClick} style={{
        background: filterCount > 0 ? PURPLE_DARK : PURPLE, color: "#fff", border: "none",
        borderRadius: 12, padding: "10px 16px", fontSize: 14, fontWeight: 600,
        cursor: "pointer", fontFamily: "inherit", boxShadow: "0 2px 8px rgba(124,111,205,0.4)",
        whiteSpace: "nowrap", position: "relative"
      }}>
        필터
        {filterCount > 0 && (
          <span style={{
            position: "absolute", top: -6, right: -6,
            background: "#FF4757", color: "#fff", borderRadius: "50%",
            width: 18, height: 18, fontSize: 11, fontWeight: 700,
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>{filterCount}</span>
        )}
      </button>
    </div>
  );
}

// ===================== FAVORITES SCREEN =====================
function FavoritesScreen({ cafes, favorites, onSelectCafe, onToggleFavorite, onClose }) {
  const favCafes = cafes.filter(c => favorites.includes(c.id));
  return (
    <div style={{
      position: "absolute", inset: 0, background: "#fff",
      zIndex: 1500, display: "flex", flexDirection: "column",
      animation: "slideInRight 0.28s ease"
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "16px 20px", borderBottom: "1px solid #f0f0f0",
        position: "sticky", top: 0, background: "#fff", zIndex: 10
      }}>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, padding: 0, color: "#333" }}>←</button>
        <span style={{ fontSize: 17, fontWeight: 700 }}>즐겨찾기</span>
        <span style={{ marginLeft: 4, fontSize: 14, color: PURPLE, fontWeight: 600 }}>{favCafes.length}</span>
      </div>
      <div style={{ overflowY: "auto", flex: 1, padding: "12px 16px 32px" }} className="no-scroll">
        {favCafes.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#ccc" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🤍</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#bbb", marginBottom: 6 }}>즐겨찾기한 카페가 없어요</div>
            <div style={{ fontSize: 13, color: "#ddd" }}>카페 상세 페이지에서 ♥ 버튼을 눌러보세요</div>
          </div>
        ) : (
          favCafes.map((cafe, i) => (
            <div key={cafe.id} style={{
              display: "flex", gap: 12, alignItems: "flex-start",
              padding: "14px 0",
              borderBottom: i < favCafes.length - 1 ? "1px solid #f5f5f5" : "none",
              cursor: "pointer"
            }} onClick={() => { onSelectCafe(cafe); onClose(); }}>
              <div style={{
                width: 56, height: 56, borderRadius: 12, background: PURPLE_LIGHT,
                flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24
              }}>☕</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontWeight: 700, fontSize: 15, color: "#1a1a1a" }}>{cafe.name}</span>
                  <button
                    onClick={e => { e.stopPropagation(); onToggleFavorite(cafe.id); }}
                    style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, padding: 0, color: "#FF4B6E" }}>
                    ♥
                  </button>
                </div>
                <div style={{ fontSize: 12, color: "#aaa", marginBottom: 7, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cafe.address}</div>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                  {[cafe.tags.콘센트, cafe.tags.분위기, cafe.tags.소음].filter(Boolean).map(t => (
                    <TagChip key={t} label={t} selected size="sm" />
                  ))}
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
function CafePreviewCard({ cafe, onOpen, onClose, isFavorite, onToggleFavorite }) {
  const topTags = [cafe.tags.콘센트, cafe.tags.분위기, cafe.tags.소음].filter(Boolean);
  return (
    <div style={{
      position: "absolute", bottom: 76, left: 12, right: 12, zIndex: 900,
      background: "#fff", borderRadius: 18, padding: "16px",
      boxShadow: "0 6px 28px rgba(0,0,0,0.14)",
      animation: "slideUp 0.25s ease"
    }}>
      <button onClick={onClose} style={{
        position: "absolute", top: 12, right: 12,
        background: "#f5f5f5", border: "none", borderRadius: "50%",
        width: 28, height: 28, cursor: "pointer", fontSize: 14,
        display: "flex", alignItems: "center", justifyContent: "center", color: "#888"
      }}>✕</button>
      <button onClick={e => { e.stopPropagation(); onToggleFavorite(cafe.id); }} style={{
        position: "absolute", top: 12, right: 48,
        background: "#f5f5f5", border: "none", borderRadius: "50%",
        width: 28, height: 28, cursor: "pointer", fontSize: 15,
        display: "flex", alignItems: "center", justifyContent: "center"
      }}>{isFavorite ? "♥" : "♡"}</button>
      <div onClick={onOpen} style={{ cursor: "pointer", display: "flex", gap: 12 }}>
        <div style={{
          width: 60, height: 60, borderRadius: 12,
          background: PURPLE_LIGHT, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26
        }}>☕</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
            <span style={{ fontWeight: 700, fontSize: 16, color: "#1a1a1a" }}>{cafe.name}</span>
            <Stars rating={cafe.rating} />
          </div>
          <div style={{ fontSize: 12, color: "#999", marginBottom: 8, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cafe.address}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {topTags.map(t => <TagChip key={t} label={t} selected size="sm" />)}
          </div>
        </div>
      </div>
      {cafe.naverLink && (
        <a href={cafe.naverLink} target="_blank" rel="noopener noreferrer" style={{
          display: "block", marginTop: 12, textAlign: "center",
          color: PURPLE, fontSize: 13, fontWeight: 500, textDecoration: "none",
          padding: "8px", background: PURPLE_LIGHT, borderRadius: 10
        }}>네이버 지도에서 보기 →</a>
      )}
    </div>
  );
}

// ===================== CAFE LIST PANEL =====================
function CafeListPanel({ cafes, onSelectCafe, filterCount, searchQuery }) {
  const [expanded, setExpanded] = useState(false);
  const listRef = useRef(null);

  // 필터나 검색 결과 있을 때 자동 펼치기
  useEffect(() => {
    if (filterCount > 0 || searchQuery) setExpanded(true);
    else setExpanded(false);
  }, [filterCount, searchQuery]);

  const collapsedHeight = 64;
  const expandedHeight = "55vh";

  return (
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 850,
      background: "#fff",
      borderRadius: expanded ? "20px 20px 0 0" : "20px 20px 0 0",
      boxShadow: "0 -4px 20px rgba(0,0,0,0.10)",
      transition: "height 0.35s cubic-bezier(0.4,0,0.2,1)",
      height: expanded ? expandedHeight : collapsedHeight,
      display: "flex", flexDirection: "column", overflow: "hidden"
    }}>
      {/* 드래그 핸들 + 헤더 */}
      <div
        onClick={() => setExpanded(e => !e)}
        style={{
          padding: "12px 20px 10px", cursor: "pointer", flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "space-between"
        }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: "#e0e0e0", marginBottom: 10 }} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a" }}>
              카공카페
              <span style={{ color: PURPLE, marginLeft: 6 }}>{cafes.length}</span>
              <span style={{ fontSize: 13, fontWeight: 400, color: "#999", marginLeft: 4 }}>곳</span>
            </span>
            <span style={{ fontSize: 13, color: "#aaa", transition: "transform 0.3s", display: "inline-block", transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}>▲</span>
          </div>
        </div>
      </div>

      {/* 리스트 */}
      <div ref={listRef} style={{ overflowY: "auto", flex: 1, padding: "0 16px 24px" }} className="no-scroll">
        {cafes.length === 0 ? (
          <div style={{ textAlign: "center", padding: "32px 0", color: "#ccc" }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
            <div style={{ fontSize: 14 }}>조건에 맞는 카페가 없어요</div>
          </div>
        ) : (
          cafes.map((cafe, i) => (
            <div
              key={cafe.id}
              onClick={() => { onSelectCafe(cafe); setExpanded(false); }}
              style={{
                display: "flex", gap: 12, alignItems: "flex-start",
                padding: "12px 0",
                borderBottom: i < cafes.length - 1 ? "1px solid #f5f5f5" : "none",
                cursor: "pointer"
              }}>
              {/* 아이콘 */}
              <div style={{
                width: 52, height: 52, borderRadius: 12, background: PURPLE_LIGHT,
                flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22
              }}>☕</div>
              {/* 정보 */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                  <span style={{ fontWeight: 700, fontSize: 15, color: "#1a1a1a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cafe.name}</span>
                  <Stars rating={cafe.rating} />
                </div>
                <div style={{ fontSize: 12, color: "#aaa", marginBottom: 7, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cafe.address}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {[cafe.tags.콘센트, cafe.tags.분위기, cafe.tags.소음].filter(Boolean).map(t => (
                    <TagChip key={t} label={t} selected size="sm" />
                  ))}
                </div>
              </div>
              <span style={{ fontSize: 18, color: "#ddd", flexShrink: 0, alignSelf: "center" }}>›</span>
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
  const toggle = (cat, tag) => {
    setLocal(prev => {
      const arr = [...(prev[cat] || [])];
      const idx = arr.indexOf(tag);
      if (idx >= 0) arr.splice(idx, 1); else arr.push(tag);
      return { ...prev, [cat]: arr };
    });
  };
  const isOn = (cat, tag) => (local[cat] || []).includes(tag);
  const totalSelected = Object.values(local).flat().length;
  const reset = () => setLocal(Object.fromEntries(Object.keys(FILTER_CATEGORIES).map(k => [k, []])));

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 2000, display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, background: "rgba(0,0,0,0.45)", animation: "fadeIn 0.2s" }} onClick={onClose} />
      <div style={{
        background: "#fff", borderRadius: "22px 22px 0 0",
        maxHeight: "82vh", display: "flex", flexDirection: "column",
        animation: "slideUpFull 0.3s ease"
      }}>
        <div style={{ padding: "20px 20px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 19, fontWeight: 700 }}>필터</span>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {totalSelected > 0 && (
                <button onClick={reset} style={{ background: "none", border: "none", cursor: "pointer", color: "#999", fontSize: 13, fontFamily: "inherit" }}>초기화</button>
              )}
              <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#555", fontSize: 20, lineHeight: 1, padding: 4 }}>✕</button>
            </div>
          </div>
        </div>
        <div style={{ overflowY: "auto", flex: 1, padding: "0 20px" }} className="no-scroll">
          {Object.entries(FILTER_CATEGORIES).map(([cat, tags]) => (
            <div key={cat} style={{ marginBottom: 22 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#222", marginBottom: 10 }}>{cat}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {tags.map(tag => <TagChip key={tag} label={tag} selected={isOn(cat, tag)} onClick={() => toggle(cat, tag)} />)}
              </div>
            </div>
          ))}
          <div style={{ height: 8 }} />
        </div>
        <div style={{ padding: "14px 20px 36px" }}>
          <button onClick={() => onApply(local)} style={{
            width: "100%", padding: "15px", background: PURPLE, color: "#fff",
            border: "none", borderRadius: 14, fontSize: 16, fontWeight: 700,
            cursor: "pointer", fontFamily: "inherit"
          }}>
            {totalSelected > 0 ? `필터 적용 (${totalSelected})` : "적용하기"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ===================== CAFE DETAIL =====================
function CafeDetail({ cafe, onBack, onWriteReview, onLike, likedReviews, isFavorite, onToggleFavorite }) {  const tagRows = [
    { label: "콘센트", val: cafe.tags.콘센트 },
    { label: "분위기", val: cafe.tags.분위기 },
    { label: "소음", val: cafe.tags.소음 },
  ].filter(r => r.val);
  const tagArrayRows = [
    { label: "공간", val: cafe.tags.공간 },
    { label: "테이블", val: cafe.tags.테이블 },
    { label: "메뉴", val: cafe.tags.메뉴 },
  ].filter(r => r.val && r.val.length > 0);

  return (
    <div style={{
      position: "absolute", inset: 0, background: "#fff",
      zIndex: 1500, overflowY: "auto", animation: "slideInRight 0.28s ease"
    }} className="no-scroll">
      {/* Hero */}
      <div style={{ position: "relative", width: "100%", height: 200, background: PURPLE_LIGHT, flexShrink: 0 }}>
        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 52, color: "#c4b8f0" }}>☕</div>
        <button onClick={onBack} style={{
          position: "absolute", top: 16, left: 16, width: 36, height: 36,
          borderRadius: "50%", background: "rgba(255,255,255,0.95)", border: "none",
          cursor: "pointer", fontSize: 17, boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>←</button>
        <button onClick={() => onToggleFavorite(cafe.id)} style={{
          position: "absolute", top: 16, right: 16, width: 36, height: 36,
          borderRadius: "50%", background: "rgba(255,255,255,0.95)", border: "none",
          cursor: "pointer", fontSize: 18, boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: isFavorite ? "#FF4B6E" : "#ccc"
        }}>{isFavorite ? "♥" : "♡"}</button>
      </div>

      <div style={{ padding: "20px 20px 100px" }}>
        {/* Title */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 4 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#1a1a1a" }}>{cafe.name}</h1>
          <Stars rating={cafe.rating} />
        </div>
        <p style={{ fontSize: 13, color: "#999", marginBottom: 6 }}>{cafe.address}</p>
        {cafe.nearStation && <p style={{ fontSize: 12, color: PURPLE, marginBottom: 14, fontWeight: 500 }}>🚇 {cafe.nearStation} 인근</p>}
        {!cafe.nearStation && <div style={{ marginBottom: 14 }} />}

        {/* Naver link */}
        {cafe.naverLink && (
          <a href={cafe.naverLink} target="_blank" rel="noopener noreferrer" style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            padding: "10px", background: PURPLE_LIGHT, borderRadius: 12,
            color: PURPLE, fontSize: 14, fontWeight: 600, textDecoration: "none", marginBottom: 8
          }}>
            🗺️ 네이버 지도에서 보기
          </a>
        )}

        {/* Owner comment */}
        <div style={{
          background: "#fafafa", borderRadius: 14, padding: "14px 16px",
          marginBottom: 22, borderLeft: `4px solid ${PURPLE}`
        }}>
          <p style={{ fontSize: 13, color: "#555", lineHeight: 1.7 }}>"{cafe.ownerComment}"</p>
        </div>

        {/* Tags */}
        <div style={{ marginBottom: 20 }}>
          {tagRows.map(({ label, val }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <span style={{ fontSize: 13, color: "#aaa", width: 42, flexShrink: 0 }}>{label}</span>
              <TagChip label={val} selected size="sm" />
            </div>
          ))}
          {tagArrayRows.map(({ label, val }) => (
            <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 10 }}>
              <span style={{ fontSize: 13, color: "#aaa", width: 42, flexShrink: 0, paddingTop: 5 }}>{label}</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {val.map(t => <TagChip key={t} label={t} selected size="sm" />)}
              </div>
            </div>
          ))}
        </div>

        <div style={{ height: 1, background: "#f0f0f0", margin: "20px 0" }} />

        {/* 오늘도 카공중인 주인장 리뷰 */}
        {cafe.reviews.filter(r => r.isOwner).map((rev, i) => (
          <div key={`owner-${i}`} style={{ marginBottom: 22 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", marginBottom: 12 }}>오늘도 카공중인 주인장 리뷰</div>
            <div style={{
              background: "#fafafa", borderRadius: 14, padding: "16px",
              display: "flex", gap: 12, alignItems: "flex-start"
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%",
                background: PURPLE_LIGHT, flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18
              }}>☕</div>
              <p style={{ fontSize: 14, color: "#444", lineHeight: 1.7 }}>{rev.text}</p>
            </div>
          </div>
        ))}

        <div style={{ height: 1, background: "#f0f0f0", margin: "4px 0 20px" }} />

        {/* 카공중인 사람들의 리뷰 */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span style={{ fontSize: 15, fontWeight: 700 }}>
            오늘도 카공중인 사람들의 리뷰 <span style={{ color: PURPLE }}>{cafe.reviews.filter(r => !r.isOwner).length}</span>
          </span>
          <button onClick={onWriteReview} style={{
            background: PURPLE, color: "#fff", border: "none",
            borderRadius: 8, padding: "7px 14px", fontSize: 13, fontWeight: 600,
            cursor: "pointer", fontFamily: "inherit"
          }}>리뷰 쓰기</button>
        </div>

        {cafe.reviews.filter(r => !r.isOwner).length === 0 && (
          <div style={{ textAlign: "center", padding: "32px 0", color: "#ccc", fontSize: 14 }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>☕</div>
            첫 번째 리뷰를 남겨보세요!
          </div>
        )}

        {cafe.reviews.filter(r => !r.isOwner).map((rev, i, arr) => (
          <div key={i} style={{ paddingBottom: 20, marginBottom: 20, borderBottom: i < arr.length - 1 ? "1px solid #f5f5f5" : "none" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{rev.user}</span>
              <span style={{ fontSize: 12, color: "#bbb" }}>{rev.date}</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 9 }}>
              {rev.tags.map(t => <TagChip key={t} label={t} selected size="sm" />)}
              {rev.extra > 0 && <span style={{ fontSize: 12, color: PURPLE, border: `1.5px solid ${PURPLE}`, borderRadius: 20, padding: "4px 8px", fontWeight: 500 }}>+{rev.extra}</span>}
            </div>
            <p style={{ fontSize: 14, color: "#444", lineHeight: 1.65, marginBottom: 10 }}>{rev.text}</p>
            <button onClick={() => onLike(cafe.id, i)} style={{
              display: "flex", alignItems: "center", gap: 4, background: "none", border: "none",
              cursor: "pointer", fontSize: 13, fontFamily: "inherit", padding: 0,
              color: likedReviews[`${cafe.id}-${i}`] ? PURPLE : "#bbb"
            }}>
              <span style={{ fontSize: 15 }}>👍</span>
              {(rev.likes || 0) + (likedReviews[`${cafe.id}-${i}`] ? 1 : 0)}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===================== WRITE REVIEW =====================
function WriteReview({ cafe, onBack, onSubmit }) {
  const [selected, setSelected] = useState({});
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);

  const toggle = (cat, tag) => {
    setSelected(prev => {
      const arr = [...(prev[cat] || [])];
      const idx = arr.indexOf(tag);
      if (idx >= 0) arr.splice(idx, 1); else arr.push(tag);
      return { ...prev, [cat]: arr };
    });
  };
  const isOn = (cat, tag) => (selected[cat] || []).includes(tag);

  const submit = () => {
    if (!text.trim()) { alert("한줄평을 입력해주세요"); return; }
    setDone(true);
    setTimeout(() => onSubmit(selected, text), 1400);
  };

  if (done) {
    return (
      <div style={{
        position: "absolute", inset: 0, background: "#fff", zIndex: 2000,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14,
        animation: "fadeIn 0.3s"
      }}>
        <div style={{ fontSize: 56 }}>🎉</div>
        <div style={{ fontSize: 20, fontWeight: 700 }}>리뷰가 등록되었어요!</div>
        <div style={{ fontSize: 14, color: "#999" }}>소중한 카공 후기 감사합니다 ☕</div>
      </div>
    );
  }

  return (
    <div style={{ position: "absolute", inset: 0, background: "#fff", zIndex: 2000, overflowY: "auto", animation: "slideInRight 0.28s ease" }} className="no-scroll">
      <div style={{
        display: "flex", alignItems: "center", gap: 12, padding: "16px 20px",
        borderBottom: "1px solid #f0f0f0", position: "sticky", top: 0, background: "#fff", zIndex: 10
      }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, padding: 0, color: "#333" }}>←</button>
        <span style={{ fontSize: 17, fontWeight: 700 }}>리뷰 쓰기</span>
      </div>

      <div style={{ padding: "22px 20px 120px" }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{cafe.name}</h2>
        <p style={{ fontSize: 13, color: "#999", marginBottom: 24 }}>이 카페에 대한 솔직한 리뷰를 남겨주세요</p>

        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>키워드 선택</div>
        {Object.entries(FILTER_CATEGORIES).map(([cat, tags]) => (
          <div key={cat} style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#666", marginBottom: 10 }}>{cat}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {tags.map(tag => <TagChip key={tag} label={tag} selected={isOn(cat, tag)} onClick={() => toggle(cat, tag)} />)}
            </div>
          </div>
        ))}

        <div style={{ height: 1, background: "#f0f0f0", margin: "8px 0 22px" }} />

        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>한줄평</div>
        <textarea
          value={text} onChange={e => setText(e.target.value)}
          placeholder="한줄평을 입력하세요" maxLength={100}
          style={{
            width: "100%", minHeight: 88, border: `1.5px solid ${PURPLE_LIGHT}`,
            borderRadius: 12, padding: "12px 14px", fontSize: 14,
            fontFamily: "inherit", resize: "none", outline: "none",
            color: "#333", background: "#fafafa", lineHeight: 1.65,
            transition: "border-color 0.15s"
          }}
          onFocus={e => e.target.style.borderColor = PURPLE}
          onBlur={e => e.target.style.borderColor = PURPLE_LIGHT}
        />
        <div style={{ textAlign: "right", fontSize: 12, color: "#ccc", marginTop: 4 }}>{text.length}/100</div>

        <div style={{ fontSize: 15, fontWeight: 700, margin: "20px 0 12px" }}>
          사진 첨부 <span style={{ fontSize: 13, color: "#bbb", fontWeight: 400 }}>(선택)</span>
        </div>
        <div style={{
          border: `2px dashed #d8d3f0`, borderRadius: 14, padding: "28px 20px",
          textAlign: "center", color: "#c4b8f0", cursor: "pointer",
          background: PURPLE_LIGHT
        }}>
          <div style={{ fontSize: 26, marginBottom: 6 }}>⬆</div>
          <div style={{ fontSize: 13 }}>사진 추가</div>
        </div>
      </div>

      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 480, padding: "12px 20px 32px", background: "#fff",
        borderTop: "1px solid #f0f0f0"
      }}>
        <button onClick={submit} style={{
          width: "100%", padding: "15px", background: PURPLE, color: "#fff",
          border: "none", borderRadius: 14, fontSize: 16, fontWeight: 700,
          cursor: "pointer", fontFamily: "inherit"
        }}>등록하기</button>
      </div>
    </div>
  );
}

// ===================== APP =====================
function App() {
  const [screen, setScreen] = useState("map");
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [likedReviews, setLikedReviews] = useState({});
  const [cafes, setCafes] = useState(CAFES);
  const [userLocation, setUserLocation] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('kagong_favorites') || '[]'); } catch { return []; }
  });
  const [showFavorites, setShowFavorites] = useState(false);

  const toggleFavorite = (cafeId) => {
    setFavorites(prev => {
      const next = prev.includes(cafeId) ? prev.filter(id => id !== cafeId) : [...prev, cafeId];
      localStorage.setItem('kagong_favorites', JSON.stringify(next));
      return next;
    });
  };

  // 현위치 취득
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => {}
      );
    }
  }, []);

  const filterCount = Object.values(activeFilters).flat().length;

  const filteredCafes = cafes.filter(cafe => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!cafe.name.toLowerCase().includes(q) && !cafe.address.toLowerCase().includes(q)) return false;
    }
    for (const [cat, vals] of Object.entries(activeFilters)) {
      if (!vals || vals.length === 0) continue;
      const cafeTags = cafe.tags[cat];
      if (!cafeTags) return false;
      const arr = Array.isArray(cafeTags) ? cafeTags : [cafeTags];
      if (!vals.some(v => arr.includes(v))) return false;
    }
    return true;
  });

  const handleMarkerClick = useCallback(cafe => setSelectedCafe(cafe), []);

  const handleApplyFilter = filters => {
    setActiveFilters(filters);
    setShowFilter(false);
  };

  const handleLike = (cafeId, idx) => {
    const key = `${cafeId}-${idx}`;
    setLikedReviews(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleReviewSubmit = (tags, text) => {
    if (!selectedCafe) return;
    const allTags = Object.values(tags).flat();
    const newReview = {
      user: "나",
      date: new Date().toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" }).replace(/\. /g, ".").replace(".", ""),
      tags: allTags.slice(0, 3),
      extra: Math.max(0, allTags.length - 3),
      text,
      likes: 0
    };
    setCafes(prev => prev.map(c =>
      c.id === selectedCafe.id ? { ...c, reviews: [newReview, ...c.reviews] } : c
    ));
    setTimeout(() => setScreen("detail"), 1500);
  };

  return (
    <div className="app-shell">
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        {/* 지도 */}
        <div style={{ width: "100%", height: "100%" }}>
          <MapScreen cafes={filteredCafes} selectedCafe={selectedCafe} onMarkerClick={handleMarkerClick} />
        </div>

        {/* 검색바 */}
        {screen === "map" && (
          <SearchBar query={searchQuery} onChange={setSearchQuery} onFilterClick={() => setShowFilter(true)} filterCount={filterCount} />
        )}

        {/* 활성 필터 칩 */}
        {screen === "map" && filterCount > 0 && (
          <div style={{ position: "absolute", top: 68, left: 12, right: 12, zIndex: 999, display: "flex", gap: 6, flexWrap: "wrap" }}>
            {Object.entries(activeFilters).flatMap(([cat, vals]) =>
              (vals || []).map(v => (
                <div key={`${cat}-${v}`} style={{
                  background: PURPLE, color: "#fff", borderRadius: 20,
                  padding: "4px 10px 4px 12px", fontSize: 12, fontWeight: 500,
                  display: "flex", alignItems: "center", gap: 4,
                  boxShadow: "0 1px 4px rgba(124,111,205,0.35)"
                }}>
                  {v}
                  <button onClick={() => {
                    setActiveFilters(prev => ({ ...prev, [cat]: (prev[cat] || []).filter(x => x !== v) }));
                  }} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.8)", cursor: "pointer", padding: 0, fontSize: 12, lineHeight: 1 }}>✕</button>
                </div>
              ))
            )}
          </div>
        )}

        {/* 카페 리스트 패널 - 지도 화면에서 항상 표시 */}
        {screen === "map" && (
          <CafeListPanel
            cafes={filteredCafes}
            onSelectCafe={(cafe) => { setSelectedCafe(cafe); }}
            filterCount={filterCount}
            searchQuery={searchQuery}
          />
        )}

        {/* 카페 미리보기 카드 - 리스트 패널 위에 표시 */}
        {screen === "map" && selectedCafe && (
          <CafePreviewCard
            cafe={selectedCafe}
            onOpen={() => setScreen("detail")}
            onClose={() => setSelectedCafe(null)}
            isFavorite={favorites.includes(selectedCafe.id)}
            onToggleFavorite={toggleFavorite}
          />
        )}



        {/* 즐겨찾기 버튼 (지도 우상단) */}
        {screen === "map" && (
          <button
            onClick={() => setShowFavorites(true)}
            style={{
              position: "absolute", top: 12, right: 96, zIndex: 1001,
              width: 42, height: 42, borderRadius: "50%",
              background: favorites.length > 0 ? "#FF4B6E" : "#fff",
              border: "none", cursor: "pointer",
              fontSize: 18, boxShadow: "0 2px 12px rgba(0,0,0,0.13)",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.2s"
            }}>
            <span style={{ color: favorites.length > 0 ? "#fff" : "#FF4B6E" }}>♥</span>
            {favorites.length > 0 && (
              <span style={{
                position: "absolute", top: -4, right: -4,
                background: PURPLE, color: "#fff", borderRadius: "50%",
                width: 17, height: 17, fontSize: 10, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>{favorites.length}</span>
            )}
          </button>
        )}

        {/* 즐겨찾기 화면 */}
        {showFavorites && (
          <FavoritesScreen
            cafes={cafes}
            favorites={favorites}
            onSelectCafe={(cafe) => { setSelectedCafe(cafe); setScreen("detail"); setShowFavorites(false); }}
            onToggleFavorite={toggleFavorite}
            onClose={() => setShowFavorites(false)}
          />
        )}
        {screen === "detail" && selectedCafe && (
          <CafeDetail
            cafe={cafes.find(c => c.id === selectedCafe.id) || selectedCafe}
            onBack={() => setScreen("map")}
            onWriteReview={() => setScreen("review")}
            onLike={handleLike}
            likedReviews={likedReviews}
            isFavorite={favorites.includes(selectedCafe.id)}
            onToggleFavorite={toggleFavorite}
          />
        )}

        {/* 리뷰 쓰기 */}
        {screen === "review" && selectedCafe && (
          <WriteReview
            cafe={selectedCafe}
            onBack={() => setScreen("detail")}
            onSubmit={handleReviewSubmit}
          />
        )}

        {/* 필터 모달 */}
        {showFilter && (
          <FilterModal
            activeFilters={activeFilters}
            onApply={handleApplyFilter}
            onClose={() => setShowFilter(false)}
          />
        )}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
