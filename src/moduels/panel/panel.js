import React, { useState } from "react";
import { Route, Redirect } from 'react-router';
import { useTable, useFilters } from "react-table";

import BriefCard from "../../components/briefCard/briefCard";
import DetailCard from "../../components/detailCard/detailCard";
import DetailCardPlaceHolder from "../../components/detailCard/placeholder/detailCardPlaceHolder";
import Header from "../../components/header/header";
import SidePanel from "../../components/sidePanel/sidePanel";
import ClipLoader from "react-spinners/ClipLoader";
import Switcher from "../../components/switcher/switcher";
import Streamer from "../streamer/streamer";

import {
  getBriefInfoList,
  getBreedDetail,
  getBreedsBySearch,
  getTableInfo,
} from "./panel.store";
import "./panel.scss";

import { connect } from "react-redux";
import Gallery from '../gallery/gallery';

const BriefCardList = ({ infoList, handleClick }) => {
  if (infoList && infoList.length !== 0) {
    return (
      <React.Fragment>
        {infoList.map((info) => (
          <BriefCard
            key={info.name}
            name={info.name}
            origin={info.origin}
            temperament={info.temperament}
            description={info.description}
            handleClick={() => handleClick(info.name)}
          />
        ))}
      </React.Fragment>
    );
  } else {
    return <ClipLoader />;
  }
};

const ListView = ({
  briefInfoList,
  currentBreed,
  breedImages,
  getBreedDetail,
}) => {
  return (
    <div className="row">
      <div className="cat-list col-5">
        <BriefCardList infoList={briefInfoList} handleClick={getBreedDetail} />
      </div>
      <div className="cat-detail col-6">
        {currentBreed ? (
          <DetailCard currentBreed={currentBreed} breedImages={breedImages} />
        ) : (
          <DetailCardPlaceHolder />
        )}
      </div>
    </div>
  );
};

const Table = ({ columns, data }) => {
  const defaultColumn = React.useMemo(
    () => ({
      Filter: ({ column: { filterValue, preFilteredRows, setFilter } }) => {
        const count = preFilteredRows.length;

        return (
          <div className="input-group">
            <input
              className="input-group-text w-50"
              value={filterValue || ""}
              onChange={(e) => {
                setFilter(e.target.value || undefined);
              }}
              placeholder={`Search ${count} records`}
            />
          </div>
        );
      },
    }),
    []
  );

  const [filter, setFilter] = useState("");

  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setFilter(value);
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters
  );

  // Render the UI for your table
  return (
    <div>
      <table className="table-view table" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th scope="col" {...column.getHeaderProps()}>
                  {column.render("Header")}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const TableView = ({ columns, data }) => {
  if (!data) {
    return <ClipLoader />;
  } else {
    return <Table columns={columns} data={data} />;
  }
};

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.getBreedInfoList = this.props.getBreedInfoList.bind(this);
    this.getTableInfo = this.props.getTableInfo.bind(this);
    this.state = {
      toggleView: this.props.toggleView,
    };
  }

  componentDidMount() {
    this.getBreedInfoList();
    this.getTableInfo();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.tableView !== this.props.tableView) {
      this.setState({ tableView: this.props.tableView });
    }
  }

  render() {
    const sortBy = [""];

    const columns = [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Origin",
        accessor: "origin",
      },
      {
        Header: "Life Span",
        accessor: "life_span",
      },
      {
        Header: "Weight",
        accessor: "weight",
      },
    ];
    return (
      <div>
        <Header />
          <Route path="/search" render={()=> {
            return(<div className="container-fluid">
              <div className="row mt-2 mb-2">
                <button className="btn btn-outline-success rounded-pill ml-4" onClick={this.getBreedInfoList}>I am feeling lucky</button>
                <Switcher />
              </div>
              <div className="row">
                <div className="col-2">
                  <SidePanel
                      recentSearch={this.props.recentSearches}
                      sortBy={sortBy}
                      breeds={this.props.breeds}
                      loading={this.props.loading}
                  />
                </div>
                <div className="col-10">
                  {this.state.tableView ? (
                      <TableView columns={columns} data={this.props.tableData} />
                  ) : (
                      <ListView
                          briefInfoList={this.props.briefInfoList}
                          currentBreed={this.props.currentBreed}
                          breedImages={this.props.breedImages}
                          getBreedDetail={this.props.getBreedDetail}
                      />
                  )}
                </div>
              </div>
            </div>)
          }} />
          <Route path="/gallery" render={()=>{
              return (<Gallery/>)
          }}/>
          <Streamer/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    briefInfoList: state.panel.briefInfoList,
    tableData: state.panel.tableData,
    currentBreed: state.panel.currentBreed,
    breedImages: state.panel.breedImages,
    tableView: state.components.tableView,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBreedInfoList: () => dispatch(getBriefInfoList()),
    getTableInfo: () => dispatch(getTableInfo()),
    getBreedDetail: (breedName) => dispatch(getBreedDetail(breedName)),
    getBreedsBySearch: (searchTerm) => dispatch(getBreedsBySearch(searchTerm)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
