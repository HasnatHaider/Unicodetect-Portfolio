import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

const CustomSelector = ({
  value,
  onChange,
  options = [],
  placeholder = "Select…",
  disabled = false,
  ariaLabel,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onMouseDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div className="csel" ref={ref}>
      <button
        type="button"
        className={"csel__trigger" + (open ? " csel__trigger--open" : "")}
        onClick={() => setOpen((v) => !v)}
        disabled={disabled}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={ariaLabel}
      >
        <span className="csel__trigger-left">
          {selected?.icon && <span className="csel__icon">{selected.icon}</span>}
          {selected ? (
            <span className="csel__trigger-label">{selected.label}</span>
          ) : (
            <span className="csel__placeholder">{placeholder}</span>
          )}
        </span>
        <ChevronDown
          size={14}
          className={"csel__chevron" + (open ? " csel__chevron--open" : "")}
        />
      </button>

      {open && (
        <div className="csel__dropdown" role="listbox">
          <div className="csel__list">
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={opt.value === value}
                className={
                  "csel__option" +
                  (opt.value === value ? " csel__option--active" : "")
                }
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
              >
                <span className="csel__option-left">
                  {opt.icon && <span className="csel__icon">{opt.icon}</span>}
                  <span className="csel__option-label">{opt.label}</span>
                </span>
                {opt.value === value && (
                  <Check size={13} className="csel__check" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelector;
