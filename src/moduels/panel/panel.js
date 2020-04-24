import React from "react";
import { useTable } from "react-table";

import BriefCard from "../../components/briefCard/briefCard";
import DetailCard from "../../components/detailCard/detailCard";
import DetailCardPlaceHolder from "../../components/detailCard/placeholder/detailCardPlaceHolder";
import Header from "../../components/header/header";
import SidePanel from "../../components/sidePanel/sidePanel";
import ClipLoader from "react-spinners/ClipLoader";
import Switcher from "../../components/switcher/switcher";
import {
  getBriefInfoList,
  getBreedDetail,
  getBreedsBySearch,
  getTableInfo,
} from "./panel.store";
import "./panel.scss";

import { connect } from "react-redux";

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
      width: 150,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
    defaultColumn,
  });

  // Render the UI for your table
  return (
    <table className="table-view table" {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th scope="col" {...column.getHeaderProps()}>
                {column.render("Header")}
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
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
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
        <div className="container-fluid">
          <div className="row mt-2 mb-2">
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
        </div>
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
