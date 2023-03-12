import React from "react";
import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { utils, writeFile } from "xlsx";

const ExportExcel = ({ headers = [], file_name = "Report", excelData }) => {
    const handleExportExcel = () => {
        const excelHeaders = [headers];
        const workbook = utils.book_new();
        const workshop = utils.json_to_sheet([]);
        utils.sheet_add_aoa(workshop, excelHeaders);
        if (excelData) {
            utils.sheet_add_json(workshop, excelData);
        }
        utils.book_append_sheet(workbook, workshop, "Report");
        writeFile(workbook, `${file_name}.xlsx`);
    };
    return (
        <Button
            size="large"
            icon={<DownloadOutlined />}
            onClick={handleExportExcel}
        >
            Export excel
        </Button>
    );
};

export default ExportExcel;
