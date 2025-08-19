import React, { useState } from "react";
import { Box, Typography, IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import CForm from "../../components/common/form/CForm";
import FilePicker from "../../components/common/form/CFilePicker";
import SectionLayout from "../../components/layout/section/SectionLayout";
import { useTranslation } from "react-i18next";
import "./CategoryForm.css";

function CategoryForm() {
  const [data, setData] = useState({
    name_ar: "",
    name_fr: "",
    name_en: "",
    sub_category: [],
    image: "",
  });

  const [subCategory, setSubCategory] = useState({
    name_ar: "",
    name_fr: "",
    name_en: "",
  });

  // حالة لإظهار أو إخفاء قسم إضافة الفئات الفرعية
  const [showSubCategorySection, setShowSubCategorySection] = useState(false);

  const fields = [
    {
      label: "name_ar",
      name: "name_ar",
      required: true,
      value: data.name_ar,
      md: 4,
    },
    {
      label: "name_en",
      name: "name_en",
      required: true,
      value: data.name_en,
      md: 4,
    },
    {
      label: "name_fr",
      name: "name_fr",
      required: true,
      value: data.name_fr,
      md: 4,
    },
  ];

  const handleFileChange = (files) => {
    setData((prev) => ({
      ...prev,
      image: files[0], // صورة واحدة فقط
    }));
  };

  const sFileds = [
    {
      label: "name_ar",
      name: "name_ar",
      required: true,
      value: subCategory.name_ar,
      md: 4,
    },
    {
      label: "name_en",
      name: "name_en",
      required: true,
      value: subCategory.name_en,
      md: 4,
    },
    {
      label: "name_fr",
      name: "name_fr",
      required: true,
      value: subCategory.name_fr,
      md: 4,
    },
    {
      buttons: [
        { label: "add_sub_categories", variant: "contained", type: "submit" },
      ],
    },
  ];

  const addSubCategory = () => {
    if (
      !subCategory.name_ar.trim() ||
      !subCategory.name_en.trim() ||
      !subCategory.name_fr.trim()
    ) {
      // ممكن تضيف تنبيه هنا لو حبيت
      return;
    }
    setData({
      ...data,
      sub_category: [subCategory, ...data.sub_category],
    });

    // إعادة تعيين الحقول بعد الإضافة
    setSubCategory({
      name_ar: "",
      name_fr: "",
      name_en: "",
    });
  };

  const handleDeleteSubCategory = (indexToDelete) => {
    setData((prevData) => ({
      ...prevData,
      sub_category: prevData.sub_category.filter(
        (_, idx) => idx !== indexToDelete
      ),
    }));
  };

  const { t } = useTranslation();

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

      <Box mt={3} mb={2} display="flex" justifyContent="center">
        <Button
          variant="outlined"
          onClick={() => setShowSubCategorySection((prev) => !prev)}
        >
          {showSubCategorySection
            ? t("hide_sub_categories_section")
            : t("show_sub_categories_section")}
        </Button>
      </Box>

      {showSubCategorySection && (
        <SectionLayout title="add_sub_categories" className="sub_categories">
          <CForm
            fields={sFileds}
            data={subCategory}
            setData={setSubCategory}
            doSubmit={addSubCategory}
          />
        </SectionLayout>
      )}

      {data.sub_category.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            {t("sub_categories")}
          </Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            {data.sub_category.map((item, index) => (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                p={2}
                borderRadius={2}
                boxShadow={2}
                bgcolor="#fff"
              >
                <Box>
                  <Typography variant="subtitle1">
                    {item.name_en || "No name"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    AR: {item.name_ar || "-"} — FR: {item.name_fr || "-"}
                  </Typography>
                </Box>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteSubCategory(index)}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
}

export default CategoryForm;
