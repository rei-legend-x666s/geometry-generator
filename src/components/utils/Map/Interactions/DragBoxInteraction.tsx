import { Feature } from "ol";
import { shiftKeyOnly } from "ol/events/condition";
import { Geometry } from "ol/geom";
import { DragBox } from "ol/interaction";
import OLVectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import MapContext from "../MapContext";
import { styles } from "../Styles/styles";

interface DragBoxInteractionProps {
  setExtent?: Dispatch<SetStateAction<number[] | undefined>>;
}

const DragBoxInteraction = ({ setExtent }: DragBoxInteractionProps) => {
  const { map } = useContext(MapContext);
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
      if (!dragBox || !setExtent) return;
      const geometry = dragBox.getGeometry();
      setExtent(geometry.getExtent());
      const boxFeature = new Feature(geometry);
      boxFeature.setStyle(styles.polygon);
      boxFeature.setId("boxFeature");
      map.getLayers().forEach((layer) => {
        if (layer.get("id") === "dragBoxLayer") {
          const vectorLayer = layer as OLVectorLayer<VectorSource<Geometry>>;
          vectorLayer.getSource().clear();
          vectorLayer.getSource().addFeature(boxFeature);
        }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragBox]);

  return null;
};

export default DragBoxInteraction;
