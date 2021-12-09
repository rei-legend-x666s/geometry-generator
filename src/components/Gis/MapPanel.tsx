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
import { useDummyData } from "../../context/DummyDataProvider";
import FullScreenDialog from "../FullScreenDialog";
import Title from "../Title";
import Controls from "./Controls/Controls";
import ZoomControl from "./Controls/ZoomControl";
import Layers from "./Layers/Layers";
import TileLayer from "./Layers/TileLayer";
import VectorLayer from "./Layers/VectorLayer";
import Map from "./Map/Map";
import osm from "./Source/osm";
import vector from "./Source/vector";
import { styles } from "./Styles/styles";
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
  };

  const handleOkFullDialog = () => {
    const newFeaturesList = dummyDataSetList.reduce(
      (item: Feature<Point>[][], dataSet) => {
        if (selected.indexOf(dataSet.id) === -1) return item;
        const geoIndexList = dataSet.columnPropsList.reduce(
          (idxList: number[], { dataFormat }, idx1) => {
            switch (dataFormat) {
              case DATA_TYPE_VALUE.LATITUDE:
                return [...idxList, idx1];
              case DATA_TYPE_VALUE.LONGITUDE:
                return [idx1, ...idxList];
              case DATA_TYPE_VALUE.GEOMETRY_POINT:
                return [idx1];
              default:
                return [];
            }
          },
          []
        );
        const latLonArray =
          geoIndexList.length > 0
            ? dataSet.records.map(({ record }) => {
                if (geoIndexList.length === 1) {
                  return record[geoIndexList[0]].data as number[];
                } else {
                  return [
                    record[geoIndexList[0]].data as number,
                    record[geoIndexList[1]].data as number,
                  ];
                }
              })
            : [];
        const features = latLonArray.map((latLon) => {
          const feature = new Feature({
            geometry: new Point(fromLonLat(latLon)),
          });
          feature.setStyle(styles.point);
          return feature;
        });
        return [...item, features];
      },
      []
    );
    setFeaturesList(newFeaturesList);
    setOpenFullDialog(false);
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
    <Paper elevation={3} sx={{ p: 2 }}>
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
      <Map center={fromLonLat(center)} zoom={zoom}>
        <Layers>
          <TileLayer source={osm()} zIndex={0} />
          {featuresList.map((features, idx) => (
            <VectorLayer key={idx} source={vector({ features })} />
          ))}
        </Layers>
        <Controls>
          <ZoomControl />
        </Controls>
      </Map>
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
