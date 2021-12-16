import { Feature } from "ol";
import { shiftKeyOnly } from "ol/events/condition";
import { Geometry } from "ol/geom";
import { DragBox } from "ol/interaction";
import OLVectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { useEffect, useState } from "react";
import { useMap } from "../../../../context/MapProvider";
import { styles } from "../Styles/styles";

const DragBoxInteraction = () => {
  const { map, getLayerById } = useMap();
  const [dragBox, setDragBox] = useState<DragBox>();

  useEffect(() => {
    if (!map) return;
    const dragBox = new DragBox({
      condition: shiftKeyOnly,
    });
    map.addInteraction(dragBox);
    setDragBox(dragBox);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  useEffect(() => {
    if (!dragBox || !map) return;
    dragBox.on("boxend", () => {
      const layer = getLayerById("dragBoxLayer");
      if (!dragBox || !layer) return;
      const geometry = dragBox.getGeometry();
      const boxFeature = new Feature(geometry);
      boxFeature.setStyle(styles.polygon);
      boxFeature.setId("box");
      const vectorLayer = layer as OLVectorLayer<VectorSource<Geometry>>;
      vectorLayer.getSource().clear();
      vectorLayer.getSource().addFeature(boxFeature);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragBox]);

  return null;
};

export default DragBoxInteraction;
