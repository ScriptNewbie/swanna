import React from "react";

const maps = {
  tg: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d81269.44827176395!2d18.77198715188062!3d50.46586470587073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471129ee71a16e17%3A0xd069d15a6f1c3f94!2sTarnowskie+G%C3%B3ry!5e0!3m2!1spl!2spl!4v1500586120424",
  kscl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9833.1220241138!2d18.83755033754838!3d50.43553763422281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x57731b1c74e7bd22!2zS2_Fm2Npw7PFgiBwLncuIMWbdy4gQW5ueQ!5e0!3m2!1spl!2spl!4v1500573216123",
  kapl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9679.660958362772!2d18.83830598088312!3d50.42819036350281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x65d19ba30a1ef36e!2sParafia+Rzymsko-katolicka+p.w.+%C5%9Bw.+Anny+-+Probostwo!5e0!3m2!1spl!2spl!4v1500590667015",
};

function Map({ map }) {
  return (
    <iframe
      className="googleMap"
      title="Mapa"
      src={maps[map]}
      frameBorder="0"
    ></iframe>
  );
}

export default Map;
