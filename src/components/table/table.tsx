import { FC, useMemo, useState, useEffect, useRef, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import styles from './table.module.css';
import TableFoto from '../table_foto/table_foto';
import { cardsApi } from '../../api/supplierCardsService';
import { rowTableHeight, supplier_id } from '../../utils/constants';
import { ICard } from '../../types';
import Price from '../price-cell/price-cell';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { getGraphData } from '../../utils/functions';
import Chart from '../charts/simple-chart';

const Table: FC = () => {
  const gridRef = useRef<any>();

  const graphData = useMemo(() => getGraphData(), []);

  const columnDefs = useMemo(
    () => [
      {
        field: 'id',
        headerName: 'Фото',
        cellRenderer: (p: any) => <TableFoto id={p.value} />,
        maxWidth: 100,
        checkboxSelection: true,
        headerCheckboxSelection: true,
        showDisabledCheckboxes: true,
      },
      {
        field: 'id',
        headerName: 'номенклатура',
        maxWidth: 150,
        filter: 'agNumberColumnFilter',
        suppressSizeToFit: true,
      },
      { field: 'brand', headerName: 'Брэнд', maxWidth: 200, filter: true },
      { field: 'name', headerName: 'название', width: 350, filter: true },
      {
        field: 'priceU',
        headerName: 'цена',
        maxWidth: 100,
        cellRenderer: (p: any) => <Price price={p.value} />,
        filter: 'agNumberColumnFilter',
        filterValueGetter: (p: any) => p.data.priceU / 100,
        suppressSizeToFit: true,
      },
      { field: 'график', minWidth: 250, cellRenderer: (data: any) => <Chart data={graphData} /> },
    ],
    []
  );

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      resizable: true,
      flex: 1,
    }),
    []
  );
  const [rowData, setRowData] = useState<ICard[]>();
  const { data } = cardsApi.useGetSupplierCardsQuery(supplier_id);
  const { data: dataRow, isSuccess } = cardsApi.useGetCardsDetailQuery(data ?? []);

  useEffect(() => {
    if (isSuccess) setRowData(dataRow);
  }, [dataRow, isSuccess]);

  const onFirstDataRendered = useCallback((params: any) => {
    gridRef.current!.api.forEachNode((node: any) => node.setSelected(!node.data));
  }, []);

  const sideBar = useMemo<any>(() => {
    return {
      toolPanels: [
        {
          id: 'columns',
          labelDefault: 'Столбцы',
          labelKey: 'columns',
          iconKey: 'columns',
          toolPanel: 'agColumnsToolPanel',
          minWidth: 225,
          width: 225,
          maxWidth: 225,
        },
        {
          id: 'filters',
          labelDefault: 'Фильтры',
          labelKey: 'filters',
          iconKey: 'filter',
          toolPanel: 'agFiltersToolPanel',
          minWidth: 180,
          maxWidth: 400,
          width: 250,
        },
      ],
      position: 'right',
      defaultToolPanel: false,
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={`${styles.grid} ag-theme-alpine`}>
        <AgGridReact
          sideBar={sideBar}
          ref={gridRef}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowData={rowData}
          rowSelection='multiple'
          suppressRowClickSelection={true}
          onFirstDataRendered={onFirstDataRendered}
          rowHeight={rowTableHeight}
        />
      </div>
    </div>
  );
};

export default Table;
