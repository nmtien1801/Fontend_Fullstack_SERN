import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { fetchAllUser, deleteUser } from "../../../services/userService";
import ReactPaginate from "react-paginate";
import "../../../styles/userManage.scss";
import * as actions from "../../../store/actions";
// import ModalDelete from "./modalDelete";
// import ModalUser from "./modalUser";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
// import "./user.scss";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      currentLimit: 2,
    };
  }

  fetchUser = async () => {
    try {
      this.props.fetchAllUserStart(
        this.state.currentPage,
        this.state.currentLimit
      );
    } catch (error) {
      console.log(">>>error fetchUser tableManageUser: ", error);
    }
  };

  componentDidMount() {
    this.fetchUser();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.currentPage !== this.state.currentPage ||
      prevState.currentLimit !== this.state.currentLimit
    ) {
      this.fetchUser();
    }
  }

  handlePageClick = async (event) => {
    this.setState({
      // (prevState) => ({ currentPage: +event.selected + 1 }) //đây là hàm bất đồng bộ chạy ss với await
      currentPage: +event.selected + 1,
    });
  };

  handleDeleteUser = async (user) => {
    try {
      this.props.deleteUserRedux(user);
    } catch (error) {
      console.log(">>>error deleteUser tableManageUser: ", error);
    }
  };

  render() {
    let { currentPage, currentLimit, handlePageClick } = this.state;
    let { listUser, totalPage } = this.props;
    return (
      <>
        <table className="table table-striped table-bordered table-hover">
          <thead className="green">
            <tr>
              <th scope="col">No</th>
              <th scope="col">Id</th>
              <th scope="col">Email</th>
              <th scope="col">userName</th>
              <th scope="col">Group</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listUser && listUser.length ? (
              <>
                {listUser.map((item, index) => {
                  return (
                    <tr key={`row-${index}`}>
                      <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                      <td>{item.id}</td>
                      <td>{item.email}</td>
                      <td>{item.userName}</td>
                      <td>{item.Group ? item.Group.name : ""}</td>
                      <td>
                        <span
                          title="Edit"
                          className="edit me-3"
                          //   onClick={() => {
                          //     this.handleEditUser(item);
                          //   }}
                        >
                          <i className="fa fa-pencil"></i>
                        </span>
                        <span
                          title="Delete"
                          className="delete"
                          onClick={() => {
                            this.handleDeleteUser(item);
                          }}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </>
            ) : (
              <>
                <tr>
                  <td>not found user</td>
                </tr>
              </>
            )}
          </tbody>
        </table>

        {totalPage > 0 && (
          <div className="user-footer">
            <ReactPaginate
              nextLabel="next >"
              onPageChange={this.handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={totalPage}
              previousLabel="< previous"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUser: state.admin.listUser,
    totalPage: state.admin.totalPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllUserStart: (currentPage, currentLimit) =>
      dispatch(actions.fetchAllUserStart(currentPage, currentLimit)),
    deleteUserRedux: (user) => dispatch(actions.deleteUserRedux(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
