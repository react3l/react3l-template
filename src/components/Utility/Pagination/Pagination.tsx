import React from 'react';
import './Pagination.scss';
import { Pagination as AntdPagination, Dropdown, Menu } from 'antd';
import { PaginationProps as AntdPaginationProps } from 'antd/lib/pagination/Pagination';

function PreviousIcon() {
  return <div className="pagination__previous-icon">
    <i className="tio-arrow_large_backward"></i>
  </div>;
}

function NextIcon() {
  return <div className="pagination__next-icon">
    <i className="tio-arrow_large_forward"></i>
  </div>;
}

interface PaginationProps extends AntdPaginationProps {
  skip?: number;
  take?: number;
  pageSizeOptions: string[];
  onChange?: (skip: number, take: number) => void;
}

function Pagination(props: PaginationProps & AntdPaginationProps) {

  const {
    skip,
    take,
    pageSizeOptions,
    total,
    onChange,
  } = props;

  const currentPage = React.useMemo(() => {
    return Math.round(skip/take) + 1;
  }, [skip, take]);

  const handleMenuClick = React.useCallback((event: any) => {
    const takeValue = Number(event.key);
    const skipValue = (currentPage - 1) * takeValue;
    onChange(skipValue, takeValue);
  }, [onChange, currentPage]);

  const handleChange = React.useCallback((page: number, pageSize: number) => {
    const take = pageSize;
    const skip = (page - 1) * take;
    onChange(skip, take);
  }, [onChange]);

  const menuPageSize = React.useMemo(() => {
    return <Menu onClick={handleMenuClick} selectedKeys={['' + take]}>
      {pageSizeOptions.map((page, index) => {
        return <Menu.Item key={page}>{page}</Menu.Item>;
      })}
    </Menu>;
  }, [pageSizeOptions, handleMenuClick, take]);

  const itemRender = React.useCallback((current: number, type: string, originalElement:  React.ReactElement) => {
    if (type === 'prev') {
      return <PreviousIcon/>;
    }
    if (type === 'next') {
      return <NextIcon/>;
    }
    return originalElement;
  }, []);

  return (
    <div className="pagination__container">
      <div className="pagination__paging">
        <AntdPagination current={currentPage}
          itemRender={itemRender}
          pageSize={take}
          onChange={handleChange} 
          showSizeChanger={false}
          showLessItems={true}
          responsive={true}
          total={total} />
      </div>      
      <div className="pagination__page-size">
      <Dropdown overlay={menuPageSize} 
        trigger={['click']}>
          <div className="pagination__size-options">
            <span className="size-options_page">{take}</span>
            <i className="size-options__icon tio-chevron_down"></i>
          </div>
      </Dropdown>
      </div>
    </div>
  );
}

Pagination.defaultProps = {
  pageSizeOptions: [10, 20, 50, 100],
  skip: 0,
  take: 10,
  total: 100,
};

export default Pagination;
