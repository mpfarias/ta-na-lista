import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import { mercados } from "../data/mercados";
import "../App.css";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const libraries = ["marker"];

const Mapa = () => {
  const mapRef = useRef(null);
  const [userPosition, setUserPosition] = useState(null);
  const [mercadoSelecionado, setMercadoSelecionado] = useState(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDIjZidvzVX5unT2kEiXi6C9GG7uMCrzmY",
    libraries,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        setUserPosition({ lat: -15.793889, lng: -47.882778 });
      }
    );
  }, []);

  if (!isLoaded || !userPosition) return <p>Carregando mapa...</p>;

  return (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userPosition}
        zoom={15}
        onLoad={(map) => (mapRef.current = map)}
      >
        <Marker position={userPosition} />

        {mercados.map((mercado) => (
          <Marker
            key={mercado.id}
            position={mercado.localizacao}
            icon={{
              url: mercado.logo,
              scaledSize: new window.google.maps.Size(48, 70),
            }}
            onClick={() => setMercadoSelecionado(mercado)}
          />
        ))}
        {mercadoSelecionado && (
          <InfoWindow
            position={mercadoSelecionado.localizacao}
            onCloseClick={() => setMercadoSelecionado(null)}
          >
            <div style={{ width: "180px", padding: 0, textAlign: "center" }}>
              <h3 style={{ marginTop: 0, fontSize: "16px" }}>
                {mercadoSelecionado.nome}
              </h3>
              <button
                style={{
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  border: "none",
                  padding: "5px 12px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => alert("Ver preços ainda não implementado")}
              >
                Ver preços
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
      <button
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          padding: "12px 18px",
          backgroundColor: "#2e7d32",
          color: "#fff",
          border: "none",
          borderRadius: "30px",
          fontSize: "16px",
          cursor: "pointer",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
        }}
        onClick={() => alert("Tela de criação de lista ainda não implementada")}
      >
        📝 Criar Lista
      </button>
    </>
  );
};
export default Mapa;
