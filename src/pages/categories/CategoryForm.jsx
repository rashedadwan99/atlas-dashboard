import { useState, useRef, useEffect } from "react";
import { Box, Typography, IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import CForm from "../../components/common/form/CForm";
import FilePicker from "../../components/common/form/CFilePicker";
import SectionLayout from "../../components/layout/section/SectionLayout";
import { useTranslation } from "react-i18next";
import "./CategoryForm.css";
import { getUserToken } from "../../services/userService";
import { addCategory, updateCategory } from "../../services/catergoryService";
import { CToast } from "../../components/common/toast/CToast";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGeneralDataAction } from "../../redux/actions/generalDataActions";
import { routes } from "../../routes/routes";

function CategoryForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.generalData);
  const [data, setData] = useState({
    name_ar: "",
    name_fr: "",
    name_en: "",
    sub_category: [],
    image: null,
    ad_price: "",
    currency: "USD",
  });
  useEffect(() => {
    if (id && Array.isArray(categories)) {
      const cat = categories.find((c) => c._id === id);
      if (cat) {
        setData(cat);

        // تمرير الصورة كرابط إلى FilePicker
        if (cat.image) {
          setFiles([cat.image]);
        }
      }
    }
  }, [id, categories]);
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [subCategory, setSubCategory] = useState({
    name_ar: "",
    name_fr: "",
    name_en: "",
  });

  const [showSubCategorySection, setShowSubCategorySection] = useState(false);

  // ref للإشارة لآخر عنصر في قائمة sub_category
  const lastSubCategoryRef = useRef(null);

  // useEffect للتمرير عند تغير sub_category
  useEffect(() => {
    if (lastSubCategoryRef.current) {
      lastSubCategoryRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [data.sub_category]);

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
    {
      label: "ad_price",
      name: "ad_price",
      required: true,
      value: data.ad_price,
      md: 8,
    },
    {
      label: "currency",
      name: "currency",
      required: true,
      value: data.currency,
      md: 4,
    },
    {
      buttons: [
        id
          ? {
              label: "update_categories",
              name: "update_categories",
              type: "submit",
              variant: "contained",
              md: 4,
              loading: isLoading,
            }
          : {
              label: "add_categories",
              name: "add_categories",
              type: "submit",
              variant: "contained",
              md: 4,
              loading: isLoading,
            },
      ],
    },
  ];

  const handleFileChange = (newFiles) => {
    setFiles(newFiles);
    setData((prev) => ({
      ...prev,
      image: newFiles[0] || null,
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
        {
          label: "add_sub_categories",
          variant: "contained",
          type: "submit",
        },
      ],
    },
  ];

  const addSubCategory = () => {
    if (
      !subCategory.name_ar.trim() ||
      !subCategory.name_en.trim() ||
      !subCategory.name_fr.trim()
    ) {
      return;
    }
    setData((prev) => ({
      ...prev,
      sub_category: [...prev.sub_category, subCategory], // إضافة في نهاية القائمة لتناسب scrollIntoView
    }));
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

  const doSubmit = async () => {
    const formData = new FormData();

    formData.append("api_token", getUserToken());
    formData.append("name_ar", data.name_ar);
    formData.append("name_en", data.name_en);
    formData.append("name_fr", data.name_fr);
    formData.append("ad_price", data.ad_price);
    formData.append("currency", data.currency);

    if (data.image) {
      formData.append("image", data.image);
    }

    data.sub_category.forEach((item, index) => {
      formData.append(`sub_category[${index}][name_ar]`, item.name_ar);
      formData.append(`sub_category[${index}][name_en]`, item.name_en);
      formData.append(`sub_category[${index}][name_fr]`, item.name_fr);
    });
    try {
      setIsLoading(true);
      if (id) {
        await updateCategory(formData, id);
        CToast("success", "update_data_successful");
        navigate(routes.viewCategories);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        await addCategory(formData);
        CToast("success", "ad_category_success");
      }
      dispatch(getGeneralDataAction());
      // إعادة تعيين البيانات والملفات
      setData({
        name_ar: "",
        name_fr: "",
        name_en: "",
        sub_category: [],
        image: null,
        ad_price: "",
        currency: "USD",
      });
      setFiles([]);
    } catch (error) {
      // خطأ في الإرسال
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FilePicker
        labelTextKey="upload_img"
        multiple={false}
        accept="image/*"
        maxSizeMB={5}
        value={files}
        onChange={handleFileChange}
      />

      <CForm
        fields={fields}
        data={data}
        setData={setData}
        doSubmit={doSubmit}
        loading={isLoading}
      />

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
            loading={isLoading}
            fields={sFileds}
            data={subCategory}
            setData={setSubCategory}
            doSubmit={addSubCategory}
          />
        </SectionLayout>
      )}

      {data.sub_category.length > 0 && (
        <Box
          mt={4}
          maxHeight={300}
          overflow="auto"
          sx={{ border: "1px solid #ddd", borderRadius: 1, p: 2 }}
        >
          <Typography variant="h6" gutterBottom>
            {t("sub_categories")}
          </Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            {data.sub_category.map((item, index) => {
              const isLast = index === data.sub_category.length - 1;
              return (
                <Box
                  key={index}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  p={2}
                  borderRadius={2}
                  boxShadow={2}
                  bgcolor="#fff"
                  ref={isLast ? lastSubCategoryRef : null} // الإشارة للعنصر الأخير
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
              );
            })}
          </Box>
        </Box>
      )}
    </>
  );
}

export default CategoryForm;
