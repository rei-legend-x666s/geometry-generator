import { Feature } from "ol";
import { Extent } from "ol/extent";
import { Geometry } from "ol/geom";
import { fromExtent } from "ol/geom/Polygon";
import { fromLonLat } from "ol/proj";
import { useEffect, useState } from "react";
import FullScreenDialog from "../utils/FullScreenDialog";
import Controls from "../utils/Map/Controls/Controls";
import ZoomControl from "../utils/Map/Controls/ZoomControl";
import DragBoxInteraction from "../utils/Map/Interactions/DragBoxInteraction";
import Layers from "../utils/Map/Layers/Layers";
import TileLayer from "../utils/Map/Layers/TileLayer";
import VectorLayer from "../utils/Map/Layers/VectorLayer";
import Map from "../utils/Map/Map";
import osm from "../utils/Map/Source/osm";
import vector from "../utils/Map/Source/vector";
import { styles } from "../utils/Map/Styles/styles";

interface RangeInputMapDialogProps {
  open: boolean;
  extent: Extent | null;
  handleOk: () => void;
  handleCancel: () => void;
}

const RangeInputMapDialog = ({
  open,
  extent,
  handleOk,
  handleCancel,
}: RangeInputMapDialogProps) => {
  const [zoom] = useState(9);
  const [center] = useState(fromLonLat([140, 35]));
  const [feature, setFeature] = useState<Feature<Geometry>>();

  useEffect(() => {
    if (!extent) return;
    const polygon = fromExtent(extent);
    const feature = new Feature(polygon);
    feature.setStyle(styles.polygon);
    feature.setId("box");
    setFeature(feature);
  }, [extent]);

  return (
    <FullScreenDialog
      open={open}
      title="Drag Map"
      handleClose={handleCancel}
      handleOk={handleOk}
    >
      <Map center={center} zoom={zoom} extent={extent}>
        <Layers>
          <TileLayer source={osm()} zIndex={0} />
          <VectorLayer
            source={vector({ features: feature ? [feature] : [] })}
            id="dragBoxLayer"
          />
        </Layers>
        <Controls>
          <ZoomControl />
        </Controls>
        <DragBoxInteraction />
      </Map>
    </FullScreenDialog>
  );
};

export default RangeInputMapDialog;
