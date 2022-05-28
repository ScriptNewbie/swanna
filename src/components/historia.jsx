import React, { Component } from "react";
import $ from "jquery";

class Historia extends Component {
  state = {};
  componentDidMount() {
    $("#msze").addClass("mszeHistFlag");
    $("#msze").removeClass("mszeBackHist");
    if ($(".mszeNabFlag").length > 0) {
      $("#msze").removeClass("mszeNabFlag");
      $("#msze").addClass("mszeHistAnimFromNab");
      setTimeout(() => {
        $("#msze").addClass("mszeHist");
      }, 1000);
    } else {
      $("#msze").addClass("mszeHistAnim");
      setTimeout(() => {
        $("#msze").addClass("mszeHist");
      }, 1000);
    }
    let height = $("#historiaContent")[0].offsetHeight + 30;
    this.props.setStyle(500, height);
  }

  componentWillUnmount() {
    $("#msze").addClass("mszeBackHist");
    $("#msze").removeClass("mszeHistAnim");
    $("#msze").removeClass("mszeHistAnimFromNab");
    $("#msze").removeClass("mszeHist");
  }

  render() {
    return (
      <div id="historiaContent">
        <div id="mobilecontent">
          {" "}
          <h1>Kościół p.w. św. Anny</h1>
          <h3>
            Według stanu z 1 grudnia 1992 roku, na terenie diecezji gliwickiej
            znajduje się sześć kościołów p.w. św. Anny. Jednym z nich jest
            kościół parafialny w Tarnowskich Górach, przy ul. Gliwickiej.
          </h3>
          Aczkolwiek świątynię tę wierni od wielu lat darzą wielkim sentymentem,
          to jednak ze względu na brak obszernych materiałów źródłowych i
          dokumentów historycznych niezwykle trudno odtworzyć jej dzieje.
          Niemniej z tego, co ocalało, możemy choć w bardzo ograniczony sposób
          przybliżyć jej historię.
          <br />
          <br />
          Na początku był to kościół „pogrzebowy”, bo zasadniczo w takim celu
          został zbudowany na cmentarzu. W miarę rozwoju miasta zwiększała się
          również liczba jego mieszkańców. Trzeba było myśleć o wybudowaniu
          większego, murowanego kościoła na miejscu znajdującej się tam
          pierwotnie drewnianej kaplicy. Nadarzyła się po temu dobra okazja.
          <br />
          <br />
          Mianowicie mieszkanka Tarnowskich Gór p. Goske (Gąska?) w testamencie
          podarowała miastu swój dom, który miał być sprzedany na budowę nowego
          kościoła na cmentarzu „za miastem”. Dom sprzedano, ale pieniędzy nie
          wystarczyło. Gromadzono dalsze środki na ten cel.
          <br />
          <br />
          Również mistrz górniczy, późniejszy burmistrz tarnogórski, Jakub
          Gruzełko zapisał miastu siedemset talarów na rzecz „budowy kościoła na
          cmentarzu przed Bramą Gliwicką zwaną też wrocławską”. Wtedy rada
          miejska w Tarnowskich Górach mogła przystąpić do budowy wspomnianego
          kościoła. Budowę prowadzili tutejsi mistrzowie: Grzegorz Marczewicz i
          Baltazar Roth.
          <br />
          <br />
          Koszty tej inwestycji zostały pokryte głównie dzięki fundacjom
          Gruzełki i Goskowej. Trudno dokładnie ustalić, kiedy ukończono budowę
          kościoła św. Anny. Jedni (np. J.Samek) podają rok 1612, inni
          (K.Winkler, J.Nowak,) rok 1619.
          <br />
          <br />
          Na cześć swojego najhojniejszego fundatora Jakuba Gruzełki kościół ten
          otrzymał imię św. Jakuba. Pośrodku gontowego dachu miał drewnianą
          wieżyczkę z małą sygnaturką, którą dzwoniono w czasie uroczystości
          pogrzebowych. Na początku kościół należał do protestantów. Katolikom
          został oddany w 1630 roku. Wtedy też otrzymał nowe wezwanie,
          mianowicie św. Anny. Katolicy tarnogórscy, mając odtąd dwa kościoły:
          farny i cmentarny, nie potrzebowali już uczęszczać na nabożeństwa do
          Starych Tarnowic.
          <br />
          <br />
          W ciągu wieków kościół św. Anny przechodził różne koleje. Ciekawostką
          może być fakt, że główny ołtarz jest darem proboszcza gliwickiego -
          ks. Sendeliusa.
          <br />
          <br />
          Duże zainteresowanie świątynią wykazał także proboszcz kościoła
          Świętych Apostołów Piotra i Pawła w Tarnowskich Górach, ks. Aleksander
          Klaybor. W II połowie XVII wieku przeprowadził gruntowny remont. Akta
          wizytacyjne z 29 listopada 1695 roku, podpisane przez ks. Władysława
          Opockiego, archidiakona krakowskiego, podają, że kościół cmentarny św.
          Anny posiada pięknie wymalowane prezbiterium i nowe ławki. W 1707 roku
          dobudowano zakrystię. Zaś w latach 1846-1847 kościół został
          powiększony. Wzbogacił się też o nową wieżę. Po tej rozbudowie zyskał
          wyraźnie pod względem architektonicznym i mógł pomieścić więcej ludzi.
          Jak podaje J.Heyda, stał się prawdziwą ozdobą miasta.
          <br />
          <br />
          Dużo uwagi poświęcił kościołowi św. Anny także ks. Antoni
          Sachneidersky, proboszcz tarnogórski w latach 1811-1851.
          <br />
          <br />
          Oprócz ceremonii pogrzebowych, sprawowano w tym kościele nabożeństwa w
          czasie Dni Krzyżowych, w Dzień Zaduszny i w uroczystości jego
          patronki, św. Anny.
          <br />
          <br />
          W latach międzywojennych świątynia służyła jako kościół garnizonowy,
          dla stacjonujących w Tarnowskich Górach żołnierzy pułków piechoty i
          ułanów.
          <br />
          <br />
          Po II wojnie światowej władze duchowne nakazały kościół wyremontować i
          przystosować do stałych nabożeństw. W okolicy świątyni powstawało
          coraz więcej domów mieszkalnych, wzrosła liczba wiernych. Toteż od
          1958 roku mianowano tam osobnych duszpasterzy - rektorów...
          <br />
          <br />
          3 maja 1981 roku, przy kościele erygowano samodzielną parafię,
          wydzieloną z parafii świętych Apostołów Piotra i Pawła.
          <br />
          <br />
          <div className="podpis1">
            ks. dr Herbert Jeziorski, <br />
            „Dekanat Tarnowskie Góry”
            <br />
            <br />
            Źródło:{" "}
            <a
              style={{ textDecoration: "none" }}
              href="http://www.montes.pl/"
              target="_blank"
            >
              www.montes.pl
            </a>
          </div>
        </div>

        <div id="tresc">
          <div align="center">
            <center>
              <table border={0} cellPadding={0} cellSpacing={0} width={420}>
                <tbody>
                  <tr>
                    <td colSpan={2} width={420}>
                      <p className="nowe1">Kościół p.w. św. Anny</p>
                      <p>
                        Według stanu z 1 grudnia 1992 roku, na terenie diecezji
                        gliwickiej znajduje się sześć kościołów p.w. św. Anny.
                        Jednym z nich jest kościół parafialny w Tarnowskich
                        Górach, przy ul. Gliwickiej.
                        <br />
                        &nbsp;
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td width={218} valign="top">
                      <p className="normal">
                        Aczkolwiek świątynię tę wierni od wielu lat darzą
                        wielkim sentymentem, to jednak ze względu na brak
                        obszernych materiałów źródłowych i dokumentów
                        historycznych niezwykle trudno odtworzyć jej dzieje.
                        Niemniej z tego, co ocalało, możemy choć w bardzo
                        ograniczony sposób przybliżyć jej historię.
                        <br />
                        <br />
                        Na początku był to kościół „pogrzebowy”, bo zasadniczo w
                        takim celu został zbudowany na cmentarzu. W miarę
                        rozwoju miasta zwiększała się również liczba jego
                        mieszkańców. Trzeba było myśleć o wybudowaniu większego,
                        murowanego kościoła na miejscu znajdującej się tam
                        pierwotnie drewnianej kaplicy. Nadarzyła się po temu
                        dobra okazja.
                      </p>
                    </td>
                    <td valign="top" width={202}>
                      <p align="center" className="okladka">
                        <img
                          border={0}
                          src="data:image/jpeg;base64,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"
                          width={160}
                          height={252}
                          alt="Z"
                        />
                        <br />
                        <b>
                          Wieża z kościoła
                          <br />
                          śś. Apostołów Piotra
                          <br />
                          i Pawła, pocztówka
                          <br />z początku XX wieku
                        </b>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} width={420}>
                      <p className="normal">
                        <br />
                        Mianowicie mieszkanka Tarnowskich Gór p. Goske (Gąska?)
                        w testamencie podarowała miastu swój dom, który miał być
                        sprzedany na budowę nowego kościoła na cmentarzu „za
                        miastem”. Dom sprzedano, ale pieniędzy nie wystarczyło.
                        Gromadzono dalsze środki na ten cel.
                        <br />
                        <br />
                        Również mistrz górniczy, późniejszy burmistrz
                        tarnogórski, Jakub Gruzełko zapisał miastu siedemset
                        talarów na rzecz „budowy kościoła na cmentarzu przed
                        Bramą Gliwicką zwaną też wrocławską”. Wtedy rada miejska
                        w Tarnowskich Górach mogła przystąpić do budowy
                        wspomnianego kościoła. Budowę prowadzili tutejsi
                        mistrzowie: Grzegorz Marczewicz i Baltazar Roth.
                        <br />
                        <br />
                        Koszty tej inwestycji zostały pokryte głównie dzięki
                        fundacjom Gruzełki i Goskowej. Trudno dokładnie ustalić,
                        kiedy ukończono budowę kościoła św. Anny. Jedni (np.
                        J.Samek) podają rok 1612, inni (K.Winkler, J.Nowak,) rok
                        1619.
                        <br />
                        &nbsp;
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td width={215} valign="top">
                      <p className="normal">
                        Na cześć swojego najhojniejszego fundatora Jakuba
                        Gruzełki kościół ten otrzymał imię św. Jakuba. Pośrodku
                        gontowego dachu miał drewnianą wieżyczkę z małą
                        sygnaturką, którą dzwoniono w czasie uroczystości
                        pogrzebowych. Na początku kościół należał do
                        protestantów. Katolikom został oddany w 1630 roku. Wtedy
                        też otrzymał nowe wezwanie, mianowicie św. Anny.
                        Katolicy tarnogórscy, mając odtąd dwa kościoły: farny i
                        cmentarny, nie potrzebowali już uczęszczać na
                        nabożeństwa do Starych Tarnowic.
                        <br />
                        <br />W ciągu wieków kościół św. Anny przechodził różne
                        koleje. Ciekawostką może być fakt, że główny ołtarz jest
                        darem proboszcza gliwickiego - ks. Sendeliusa.
                      </p>
                    </td>
                    <td width={205} valign="top">
                      <p align="center" className="okladka">
                        <img
                          border={0}
                          src="data:image/jpeg;base64,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"
                          width={170}
                          height={240}
                          alt="2Q=="
                        />
                        <br />
                        <b>
                          Kościół św. Anny (dawniej
                          <br />
                          św. Jakuba) wybudowany
                          <br />
                          w latach 1617-1619, przebudowany w latach
                          <br />
                          1846-1849 i 1928.
                        </b>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} width={420}>
                      <p className="normal">
                        <br />
                        Duże zainteresowanie świątynią wykazał także proboszcz
                        kościoła Świętych Apostołów Piotra i Pawła w Tarnowskich
                        Górach, ks. Aleksander Klaybor. W II połowie XVII wieku
                        przeprowadził gruntowny remont. Akta wizytacyjne z 29
                        listopada 1695 roku, podpisane przez ks. Władysława
                        Opockiego, archidiakona krakowskiego, podają, że kościół
                        cmentarny św. Anny posiada pięknie wymalowane
                        prezbiterium i nowe ławki. W 1707 roku dobudowano
                        zakrystię. Zaś w latach 1846-1847 kościół został
                        powiększony. Wzbogacił się też o nową wieżę. Po tej
                        rozbudowie zyskał wyraźnie pod względem
                        architektonicznym i mógł pomieścić więcej ludzi. Jak
                        podaje J.Heyda, stał się prawdziwą ozdobą miasta.
                        <br />
                        <br />
                        Dużo uwagi poświęcił kościołowi św. Anny także ks.
                        Antoni Sachneidersky, proboszcz tarnogórski w latach
                        1811-1851.
                        <br />
                        <br />
                        Oprócz ceremonii pogrzebowych, sprawowano w tym kościele
                        nabożeństwa w czasie Dni Krzyżowych, w Dzień Zaduszny i
                        w uroczystości jego patronki, św. Anny.
                        <br />
                        <br />
                        W latach międzywojennych świątynia służyła jako kościół
                        garnizonowy, dla stacjonujących w Tarnowskich Górach
                        żołnierzy pułków piechoty i ułanów.
                        <br />
                        <br />
                        Po II wojnie światowej władze duchowne nakazały kościół
                        wyremontować i przystosować do stałych nabożeństw. W
                        okolicy świątyni powstawało coraz więcej domów
                        mieszkalnych, wzrosła liczba wiernych. Toteż od 1958
                        roku mianowano tam osobnych duszpasterzy - rektorów...
                        <br />
                        <br />3 maja 1981 roku, przy kościele erygowano
                        samodzielną parafię, wydzieloną z parafii świętych
                        Apostołów Piotra i Pawła.
                      </p>
                      <p className="podpis1">
                        ks. dr Herbert Jeziorski,
                        <br />
                        „Dekanat Tarnowskie Góry”
                        <br />
                        <br />
                        <small>
                          <span style={{ fontStyle: "italic" }}>
                            Źródło:{" "}
                            <a
                              style={{ textDecoration: "none" }}
                              href="http://www.montes.pl/"
                              target="_blank"
                            >
                              www.montes.pl
                            </a>
                          </span>
                        </small>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td height={14} colSpan={2} width={420} />
                  </tr>
                </tbody>
              </table>
            </center>
          </div>
        </div>
      </div>
    );
  }
}

export default Historia;
