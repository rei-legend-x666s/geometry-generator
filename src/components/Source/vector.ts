import { Feature } from "ol";
import { Geometry } from "ol/geom";
import { Vector as VectorSource } from "ol/source";

interface vectorProps {
  features: Feature<Geometry>[];
}

const vector = ({ features }: vectorProps) => {
  return new VectorSource({ features });
};

export default vector;
