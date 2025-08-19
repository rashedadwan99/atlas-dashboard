import React, { useState } from "react";
import CForm from "../../components/common/form/CForm";
import FilePicker from "../../components/common/form/CFilePicker";

function CategoryForm() {
  // const { cid } = useParams();
  const [data, setData] = useState({
    name_ar: "",
    name_fr: "",
    name_en: "",
    sub_category: [],
    image: "",
  });
  const fields = [
    { label: "name_ar", required: true, value: data.name_ar, md: 4 },

    { label: "name_en", required: true, value: data.name_en, md: 4 },
    { label: "name_fr", required: true, value: data.name_fr, md: 4 },
  ];
  const handleFileChange = (files) => {
    setData((prev) => ({
      ...prev,
      image: files[0], // لأننا نرفع صورة واحدة فقط
    }));
  };
  return (
    <>
      <FilePicker
        labelTextKey="upload_img"
        multiple={false}
        accept="image/*"
        maxSizeMB={5}
        onChange={handleFileChange}
      />
      <CForm fields={fields} data={data} setData={setData} />
      <CForm fields={fields} data={data} setData={setData} />
    </>
  );
}

export default CategoryForm;
