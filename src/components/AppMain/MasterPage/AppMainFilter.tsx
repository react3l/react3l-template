import { Card } from 'antd';
import InputSearch from 'components/Utility/InputSearch/InputSearch';
import { TFunction } from 'i18next';
import { Animate } from "react-show";
import React, { ReactNode } from 'react';
import { UseMaster } from 'services/pages/master-service';
import classNames from 'classnames';

export interface AppMainFilterProps extends UseMaster {
    translate: TFunction,
    children: ReactNode
};

export function AppMainFilter (props: AppMainFilterProps) {
    const {
        toggle,
        translate,
        handleToggleSearch,
        handleResetFilter,
        children
    } = props;

    return <>
        <div className='page__search'>
            <Card title={translate("general.search.title")}>
                <div className='d-flex align-items-center'>
                    <div className='pr-4 flex-grow-1'>
                        <InputSearch />
                    </div>
                    {/* start toggle and reset filter */}
                    <div className='d-flex justify-content-around'>
                        <button className={classNames(
                                'btn component__btn-toggle mr-4 grow-animate-1' ,
                                toggle === true ? 'component__btn-toggle-active' : '' ,
                                )}
                                onClick={handleToggleSearch}>
                            <i className='tio-tune_horizontal'></i>
                            <span className='component_btn-text'>
                                {translate("general.button.advance")}
                            </span>
                        </button>
                        <button className='btn component__btn-toggle grow-animate-1'
                                onClick={handleResetFilter}>
                            <i className='tio-restore'></i>
                            <span className='component_btn-text'>
                                {translate("general.button.filter")}
                            </span>
                        </button>
                    </div>
                    {/* end toggle and reset filter */}
                </div>
                <Animate show={toggle}
                            duration={500}
                            style={ {height: "auto" } }
                            transitionOnMount={true}
                            start={ {height: 0} }
                            leave={ {opacity: 0, height: 0} }>
                        {children}
                </Animate>
            </Card>
        </div>
    </>;
}