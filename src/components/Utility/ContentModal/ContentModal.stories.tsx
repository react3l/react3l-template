import React from "react";
import { storiesOf } from "@storybook/react";
import nameof from "ts-nameof.macro";
import ContentModal from "./ContentModal";
import { Row, Col } from "antd";
import FormItem from "../FormItem/FormItem";
import InputText from "../Input/InputText/InputText";
import { translate } from "@react3l/react3l/helpers/i18n";
import Select from "../Select/Select";
import { ModelFilter } from "@react3l/react3l/core/model-filter";
import { tableService } from "services/TableService";
import { Payment } from "models/Payment";
import { PaymentFilter } from "models/PaymenFilter";
import { paymentRepository } from "repositories/payment-repository";
import { ColumnProps } from "antd/lib/table";
import { Province } from "models/Province";

const filter = new PaymentFilter();

function Default() {
  const [toogleModal, setToogleModal] = React.useState(false);
  const handleOpenModal = () => {
    setToogleModal(true);
  };
  const handleCloseModal = () => {
    setToogleModal(false);
  };
  const [list, , total, loading, ,] = tableService.useMasterTable<
    Payment,
    PaymentFilter
  >(filter, paymentRepository.list, paymentRepository.count);

  const columns: ColumnProps<Payment>[] = React.useMemo(
    () => [
      {
        title: translate("paymentRequest.id"),
        key: nameof(list[0].id),
        dataIndex: nameof(list[0].id),
        sorter: true,
        sortOrder: tableService.getAntOrderType(filter, nameof(list[0].id)),
        render(id: number) {
          return id;
        },
      },
      {
        title: translate("paymentRequest.name"),
        key: nameof(list[0].name),
        dataIndex: nameof(list[0].name),
        sorter: true,
        sortOrder: tableService.getAntOrderType(filter, nameof(list[0].name)),
        ellipsis: true,
      },
      {
        title: () => (
          <div>
            <div>{translate("paymentRequest.code")}</div>
          </div>
        ),
        key: nameof(list[0].code),
        dataIndex: nameof(list[0].code),
        sorter: true,
        sortOrder: tableService.getAntOrderType(filter, nameof(list[0].code)),
        ellipsis: true,
      },
      {
        title: translate("paymentRequest.province"),
        key: nameof(list[0].province),
        dataIndex: nameof(list[0].province),
        sorter: true,
        sortOrder: tableService.getAntOrderType(
          filter,
          nameof(list[0].province),
        ),
        render(province: Province) {
          return province.name;
        },
      },
      {
        title: translate("paymentRequest.status"),
        key: nameof(list[0].status),
        dataIndex: nameof(list[0].status),
        align: "center",
        render(status) {
          return (
            <div className='d-flex justify-content-center'>
              {status?.id === 1 && <div className='shipped'>Shipped</div>}
              {status?.id === 2 && <div className='processing'>Processing</div>}
              {status?.id === 3 && <div className='cancelled'>Cancelled</div>}
            </div>
          );
        },
      },
    ],
    [list],
  );

  return (
    <>
      <ContentModal
        visible={toogleModal}
        title={"Test Modal"}
        width={800}
        total={total}
        loading={loading}
        filter={filter}
        columns={columns}
        list={list}
        handleCancel={handleCloseModal}
      >
        <>
          <Row>
            <Col lg={8} className='pr-3'>
              <FormItem label={"Người đề nghị"}>
                <InputText
                  isMaterial={true}
                  value={null}
                  placeHolder={"Chọn người đề nghị"}
                  className={"tio-account_square_outlined"}
                />
              </FormItem>
            </Col>
            <Col lg={8} className='pr-3'>
              <FormItem label={"Người nhận"}>
                <InputText
                  isMaterial={true}
                  value={null}
                  placeHolder={"Chọn người nhận hàng"}
                  className={"tio-user_switch"}
                />
              </FormItem>
            </Col>
            <Col lg={8} className='pr-3'>
              <FormItem label={"Địa chỉ nhận hàng"}>
                <InputText
                  isMaterial={true}
                  value={null}
                  placeHolder={"Nhập địa chỉ"}
                  className={"tio-group_add"}
                />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col lg={8} className='pr-3'>
              <FormItem label={translate("Loại chứng từ")}>
                <Select
                  classFilter={ModelFilter}
                  placeHolder={"Chọn loại chứng từ"}
                  isMaterial={true}
                />
              </FormItem>
            </Col>
            <Col lg={8} className='pr-3'>
              <FormItem label={"Ký hiệu hóa đơn"}>
                <InputText
                  isMaterial={true}
                  value={null}
                  placeHolder={"Nhập ký hiệu hóa đơn"}
                  className={"tio-files_labeled_outlined"}
                />
              </FormItem>
            </Col>
            <Col lg={8} className='pr-3'>
              <FormItem label={translate("Loại tiền")}>
                <Select
                  classFilter={ModelFilter}
                  placeHolder={"Chọn loại tiền"}
                  isMaterial={true}
                />
              </FormItem>
            </Col>
          </Row>
        </>
      </ContentModal>
      <button className='btn btn-info' onClick={handleOpenModal}>
        OpenModal
      </button>
    </>
  );
}

storiesOf("ContentModal", module).add(nameof(Default), Default);
