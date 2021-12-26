import { MoreVert } from "@mui/icons-material";
import {
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
} from "@mui/material";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import React, { useState } from "react";
import { DATA_TYPE_VALUE } from "../../constants/column-format";
import { DATE_FORMAT } from "../../constants/utils";
import { useDummyData } from "../../context/DummyDataProvider";
import MapProvider from "../../context/MapProvider";
import { formatFromISO } from "../../functions/dateUtils";
import { createFeaturePropsFromRecord } from "../../functions/gisUtils";
import FullScreenDialog from "../utils/FullScreenDialog";
import Controls from "../utils/Map/Controls/Controls";
import ZoomControl from "../utils/Map/Controls/ZoomControl";
import Layers from "../utils/Map/Layers/Layers";
import TileLayer from "../utils/Map/Layers/TileLayer";
import VectorLayer from "../utils/Map/Layers/VectorLayer";
import Map from "../utils/Map/Map";
import PopupControl from "../utils/Map/PopupControl";
import osm from "../utils/Map/Source/osm";
import vector from "../utils/Map/Source/vector";
import { styles } from "../utils/Map/Styles/styles";
import Title from "../utils/Title";
import "ol/ol.css";

const MapPanel = () => {
  const { dummyDataSetList } = useDummyData();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [openFullDialog, setOpenFullDialog] = useState(false);
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [center] = useState([140, 35]);
  const [zoom] = useState(9);
  const [featuresList, setFeaturesList] = useState<Feature<Point>[][]>([]);

  const handleOptionsMenu = ({
    currentTarget,
  }: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(currentTarget);
  };

  const handleCloseOptionsMenu = () => {
    setAnchorEl(null);
  };

  const handleSetLayer = () => {
    setOpenFullDialog(true);
  };

  const handleCloseFullDialog = () => {
    setOpenFullDialog(false);
    handleCloseOptionsMenu();
  };

  const handleOkFullDialog = () => {
    const newFeaturesList = dummyDataSetList.reduce(
      (item: Feature<Point>[][], dataSet) => {
        if (selected.indexOf(dataSet.id) === -1) return item;
        const geoIndexList = dataSet.columnPropsList.reduce(
          (idxList: number[], { dataFormat }, idx1) => {
            switch (dataFormat) {
              case DATA_TYPE_VALUE.LATITUDE:
                return [idx1, ...idxList];
              case DATA_TYPE_VALUE.LONGITUDE:
                return [...idxList, idx1];
              case DATA_TYPE_VALUE.GEOMETRY_POINT:
                return [idx1];
              default:
                return idxList;
            }
          },
          []
        );
        const featureInfo =
          geoIndexList.length > 0
            ? dataSet.records.map(({ record }) => {
                const latLon =
                  geoIndexList.length === 1
                    ? (record[geoIndexList[0]].data as number[])
                    : [
                        record[geoIndexList[0]].data as number,
                        record[geoIndexList[1]].data as number,
                      ];
                return {
                  props: createFeaturePropsFromRecord(
                    dataSet.columnPropsList,
                    record
                  ),
                  latLon,
                };
              })
            : [];
        const features = featureInfo.map(({ props, latLon }) => {
          const feature = new Feature({
            geometry: new Point(fromLonLat([latLon[1], latLon[0]])),
          });
          feature.setProperties(props);
          feature.setStyle(styles.point);
          return feature;
        });
        return [...item, features];
      },
      []
    );
    setFeaturesList(newFeaturesList);
    setOpenFullDialog(false);
    handleCloseOptionsMenu();
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const handleClickLayerRow = (
    event: React.MouseEvent<unknown>,
    id: string
  ) => {
    setSelected(
      selected.indexOf(id) === -1
        ? [...selected, id]
        : selected.filter((item) => item !== id)
    );
  };

  return (
    <Paper elevation={3} sx={{ p: 2, height: 600 }}>
      <Toolbar variant="dense" sx={{ minHeight: 40 }}>
        <Title>Map</Title>
        <div style={{ flexGrow: 1 }} />
        <div>
          <IconButton
            aria-label="options"
            color="inherit"
            onClick={handleOptionsMenu}
          >
            <MoreVert />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseOptionsMenu}
            PaperProps={{
              sx: {
                mt: 1.5,
                overflow: "visible",
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleSetLayer}>Layer Setting</MenuItem>
          </Menu>
        </div>
      </Toolbar>
      <MapProvider>
        <Map center={fromLonLat(center)} zoom={zoom} height="calc(100% - 40px)">
          <Layers>
            <TileLayer source={osm()} zIndex={0} />
            {featuresList.map((features, idx) => (
              <VectorLayer key={idx} source={vector({ features })} />
            ))}
          </Layers>
          <Controls>
            <PopupControl />
            <ZoomControl />
          </Controls>
        </Map>
      </MapProvider>
      <FullScreenDialog
        open={openFullDialog}
        title="Set Layer"
        handleClose={handleCloseFullDialog}
        handleOk={handleOkFullDialog}
      >
        <Table>
          <TableBody>
            {dummyDataSetList.map((dataSet, idx) => {
              const isItemSelected = isSelected(dataSet.id);
              const labelId = `enhanced-table-checkbox-${idx + 1}`;

              return (
                <TableRow
                  hover
                  onClick={(event) => handleClickLayerRow(event, dataSet.id)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={dataSet.id}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      inputProps={{
                        "aria-labelledby": labelId,
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">#{idx + 1}</TableCell>
                  <TableCell align="right">
                    {dataSet.name || <em>No Name</em>}
                  </TableCell>
                  <TableCell align="right">
                    {formatFromISO(dataSet.createdAt, DATE_FORMAT.TYPE2)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </FullScreenDialog>
    </Paper>
  );
};

export default MapPanel;
