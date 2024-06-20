import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { fetchAllUser, deleteUser } from "../../../services/userService";
import ReactPaginate from "react-paginate";
import "../../../styles/userManage.scss";
import ModalDelete from "./modalDelete";
import ModalUser from "./modalUser";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import "./user.scss";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUser: [],
      currentPage: 1,
      currentLimit: 2,
      totalPage: 0,
      // Modal delete
      isShowModalDelete: false,
      dataModal: {},
      isDataInPage: true,
      // Modal user update/create
      isShowModalUser: false,
      actionModalUser: "",
      dataModalUser: {},
    };
  }

  fetchUser = async () => {
    let res = await fetchAllUser(
      this.state.currentPage,
      this.state.currentLimit
    );
    if (res && res.EC === 0) {
      this.setState({
        listUser: res.DT.users,
        totalPage: res.DT.totalPage,
      });
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

  handleRefresh = async () => {
    await this.fetchUser();
  };

  handleEditUser = (user) => {
    this.setState({
      actionModalUser: "UPDATE",
      dataModalUser: user,
      isShowModalUser: true,
    });
  };

  handleDeleteUser = (user) => {
    this.setState({
      dataModal: user,
      isShowModalDelete: true,
    });
  };

  handleAddNewUser = () => {
    this.setState({
      actionModalUser: "CREATE",
      isShowModalUser: true,
    });
  };

  onHideModalUser = async () => {
    this.setState({
      isShowModalUser: false,
      dataModalUser: {},
    });
    await this.fetchUser();
    window.location.reload();
  };

  confirmDeleteUser = async () => {
    let res = await deleteUser(this.state.dataModal);
    // console.log(">>>check res user delete: ", res);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      if (this.state.isDataInPage === false) {
        this.setState({
          currentPage: this.state.currentPage - 1,
        });
      }
      await this.fetchUser();
      this.setState({
        isShowModalDelete: false,
      });
    } else {
      toast.error(res.EM);
    }
  };

  handleClose = () => {
    this.setState({
      isShowModalDelete: false,
    });
    window.location.reload();
  };

  render() {
    let {
      listUser,
      currentPage,
      currentLimit,
      totalPage,
      handlePageClick,
      isShowModalDelete,
      dataModal,
      isShowModalUser,
      dataModalUser,
      actionModalUser,
    } = this.state;
    return (
      <>
        <div className="container">
          <div className="manage-user-container">
            <div className="user-header">
              <div className="title mt-3">
                <h3>Manage Users</h3>
              </div>
              <div className="actions my-3">
                <button
                  className="btn btn-success"
                  onClick={() => {
                    this.handleRefresh();
                  }}
                >
                  <i className="fa fa-refresh refresh"></i>refresh
                </button>
                <button
                  className="btn btn-primary ms-3"
                  onClick={() => {
                    this.handleAddNewUser();
                  }}
                >
                  <i className="fa fa-plus-circle"></i>
                  add new user
                </button>
              </div>
            </div>

            <div className="user-body">
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
                            <td>
                              {(currentPage - 1) * currentLimit + index + 1}
                            </td>
                            <td>{item.id}</td>
                            <td>{item.email}</td>
                            <td>{item.userName}</td>
                            <td>{item.Group ? item.Group.name : ""}</td>
                            <td>
                              <span
                                title="Edit"
                                className="edit me-3"
                                onClick={() => {
                                  this.handleEditUser(item);
                                }}
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
            </div>

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
          </div>
        </div>
        <ModalDelete
          show={isShowModalDelete}
          handleClose={this.handleClose}
          confirmDeleteUser={this.confirmDeleteUser}
          dataModal={dataModal}
        />

        <ModalUser
          show={this.state.isShowModalUser}
          onHideModalUser={this.onHideModalUser}
          action={this.state.actionModalUser}
          dataModal={this.state.dataModalUser}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
