import { Grid } from "@mui/material";
import { Overlay } from "ol";
import { useEffect, useRef, useState } from "react";
import { useMap } from "../../../context/MapProvider";

const PopupControl = () => {
  const popupRef = useRef<HTMLDivElement>(null);
  const { map } = useMap();
  const [popupProps, setPopupProps] = useState<{ [k: string]: any }>({});

  useEffect(() => {
    if (!map || !popupRef.current) return;

    const overlay = new Overlay({
      element: popupRef.current,
    });
    map.addOverlay(overlay);

    map.on("singleclick", ({ pixel, coordinate }) => {
      map.forEachFeatureAtPixel(pixel, (feature) => {
        if (!popupRef.current) return;
        popupRef.current.hidden = false;
        setPopupProps(feature.getProperties());
        overlay.setPosition(coordinate);
      });
    });
  }, [map]);

  return (
    <div ref={popupRef} hidden={true} className="ol-popup">
      <Grid container sx={{ p: 1 }}>
        {Object.keys(popupProps)
          .filter((k) => k !== "geometry")
          .map((k, idx) => (
            <>
              <Grid key={idx} item xs={2}>
                {k}
              </Grid>
              <Grid key={idx} item xs={10}>
                {popupProps[k]}
              </Grid>
            </>
          ))}
      </Grid>
    </div>
  );
};

export default PopupControl;
