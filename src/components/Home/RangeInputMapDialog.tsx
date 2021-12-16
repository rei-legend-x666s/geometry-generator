import { fromLonLat } from "ol/proj";
import { useState } from "react";
import FullScreenDialog from "../utils/FullScreenDialog";
import Controls from "../utils/Map/Controls/Controls";
import ZoomControl from "../utils/Map/Controls/ZoomControl";
import DragBoxInteraction from "../utils/Map/Interactions/DragBoxInteraction";
import Layers from "../utils/Map/Layers/Layers";
import TileLayer from "../utils/Map/Layers/TileLayer";
import VectorLayer from "../utils/Map/Layers/VectorLayer";
import MapContent from "../utils/Map/Map";
import osm from "../utils/Map/Source/osm";
import vector from "../utils/Map/Source/vector";

interface RangeInputMapDialogProps {
  open: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

const RangeInputMapDialog = ({
  open,
  handleOk,
  handleCancel,
}: RangeInputMapDialogProps) => {
  const [zoom] = useState(9);
  const [center] = useState([140, 35]);

  return (
    <FullScreenDialog
      open={open}
      title="Drag Map"
      handleClose={handleCancel}
      handleOk={handleOk}
    >
      <MapContent center={fromLonLat(center)} zoom={zoom}>
        <Layers>
          <TileLayer source={osm()} zIndex={0} />
          <VectorLayer source={vector({ features: [] })} id="dragBoxLayer" />
        </Layers>
        <Controls>
          <ZoomControl />
        </Controls>
        <DragBoxInteraction />
      </MapContent>
    </FullScreenDialog>
  );
};

export default RangeInputMapDialog;
