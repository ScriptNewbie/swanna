import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { createPortal } from "react-dom";
import ApiClient from "../../services/apiClient";

const client = new ApiClient<string>("/api/report-old?what=ogloszenia");

function Problem({
  nextWeek,
  current,
  visible,
  setVisible,
}: {
  nextWeek: () => void;
  current: number;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [present, setPresent] = useState(visible);
  const [shown, setShown] = useState(false);
  const [response, setResponse] = useState("");
  const [reporting, setReporting] = useState(false);
  const alertClass = response.startsWith("Wys")
    ? "alert-danger"
    : response.startsWith("Kto")
      ? "alert-secondary"
      : "alert-success";

  useEffect(() => {
    if (visible) {
      setPresent(true);
      return;
    }
    setShown(false);
  }, [visible]);

  useEffect(() => {
    if (!present || !visible) return;
    const frame = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(frame);
  }, [present, visible]);

  useEffect(() => {
    if (!shown) return;
    dialogRef.current?.querySelector<HTMLElement>("button")?.focus();
  }, [shown]);

  useEffect(() => {
    if (visible || !present) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const timeout = window.setTimeout(
      () => setPresent(false),
      reduceMotion ? 0 : 350,
    );
    return () => window.clearTimeout(timeout);
  }, [visible, present]);

  useEffect(() => {
    if (!present) return;

    const previouslyFocused = document.activeElement;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setVisible(false);
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      }
    };
  }, [present, setVisible]);

  if (!present) return null;

  const close = () => setVisible(false);

  return createPortal(
    <div
      className={shown ? "modal-overlay show" : "modal-overlay"}
      aria-hidden={shown ? undefined : true}
      onClick={close}
    >
      <div
        className="modal-dialog"
        onTransitionEnd={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.propertyName !== "transform") return;
          if (!visible) setPresent(false);
        }}
      >
        <div
          className="modal-content"
          role="dialog"
          aria-modal="true"
          aria-labelledby="problemModalTitle"
          ref={dialogRef}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              aria-label="Zamknij"
              onClick={close}
            />
          </div>
          <div className="modal-body" id="problemModalTitle">
            Jeżeli w ogóle nie widzisz ogłoszeń, naciśnij przycisk
            "Link&nbsp;bezpośredni" poniżej. Przyciśnięcie go spowoduje
            pobranie ogłoszeń lub otwarcie ich w nowej karcie. Możesz też
            spróbować po prostu odświeżyć stronę.
            <br />
            <br />
            Jeżeli ogłoszenia które widzisz są nieaktualne, zobacz czy
            ogłoszenia na obecny tydzień nie są dostępne po przyciśnięciu
            przycisku "Następny&nbsp;tydzień". Jeśli nie są, spróbuj odświeżyć
            stronę. Jeżeli nadal ogłoszenia które widzisz są niaktualne,
            naciśnij przycisk "Zgłoś&nbsp;niaktualne"!
            <div
              id="responseAlert"
              className={response ? " responseAlertVisible" : ""}
              role="alert"
            >
              <div className={`alert ${alertClass}`}>{response}</div>
            </div>
          </div>
          <div className="modal-footer">
            {current === 0 && (
              <button
                onClick={() => {
                  nextWeek();
                  close();
                }}
                type="button"
                className="btn btn-primary"
              >
                Następny tydzień
              </button>
            )}
            <a
              href={
                "https://api.swanna.net.pl/api/ogloszenia/" +
                (current === 0 ? "ogloszenia.pdf" : "next.pdf")
              }
              target="_blank"
              className="btn btn-warning"
            >
              Link bezpośredni
            </a>
            <button
              type="button"
              onClick={() => {
                if (reporting) return;
                setReporting(true);
                client
                  .get()
                  .then((data) => {
                    setResponse(data);
                  })
                  .catch(() => {
                    setResponse("Wystąpił nieoczekiwany błąd!");
                  })
                  .finally(() => {
                    setReporting(false);
                  });
              }}
              className={
                reporting ? "btn btn-success btn-breathing" : "btn btn-success"
              }
            >
              Zgłoś nieaktualne
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default Problem;
