/* eslint-disable react/prop-types */
import { API_URL } from "../../service/apiService";

export const Imagen = ({ imagen, width, height = "50" }) => {
  const urlImage = API_URL + "inmuebles/imagen/" + Number.parseInt(imagen?.id);

  return (
    <img
      style={{
        minHeight: "100%",
        cursor: "pointer",
        objectFit: "cover",
        objectPosition: "center",
      }}
      loading="lazy"
      src={imagen?.id ? urlImage : "/default.png"}
      width={width}
      height={width / 2}
      alt={imagen?.nombre}
      onClick={() => {
        window.open(urlImage, "_blank");
      }}
    />
  );
};
