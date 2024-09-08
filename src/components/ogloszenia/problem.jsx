import React, { useState } from "react";
import ApiClient from "../../services/apiClient";

const client = new ApiClient("/api/report-old?what=ogloszenia");

function Problem({ nextWeek, current }) {
  const [response, setResponse] = useState("");
  const alertType = response.startsWith("Wys")
    ? "danger"
    : response.startsWith("Kto")
    ? "secondary"
    : "success";
  return (
    <div id="infoProblem">
      <div
        className="modal fade"
        id="problemModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
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
                <div className={`alert alert-${alertType} mx-0`}>
                  {response}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              {current === 0 && (
                <button
                  onClick={nextWeek}
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Następny tydzień
                </button>
              )}
              <a
                href={
                  "https://api.swanna.net.pl/ogloszenia/" +
                  (current === 0 ? "ogloszenia.pdf" : "next.pdf")
                }
                target="_blank"
                className="btn btn-warning"
              >
                Link bezpośredni
              </a>
              <button
                onClick={(e) => {
                  e.target.classList.add("btn-breathing");
                  client
                    .get()
                    .then((data) => {
                      setResponse(data);
                    })
                    .catch(() => {
                      setResponse("Wystąpił nieoczekiwany błąd!");
                    })
                    .finally(() => {
                      e.target.classList.remove("btn-breathing");
                    });
                }}
                className="btn btn-success"
              >
                Zgłoś nieaktualne
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Problem;
