const service = require('../services/categoriesService');

const postCategory = async (req, res) => {
  const id = await service.addCategory(req.body);
  res.status(201).json({ status: 'success', message: 'Category berhasil ditambahkan', data: { id } });
};

const getCategories = async (req, res) => {
  const categories = await service.getCategories();
  res.json({ status: 'success', data: { categories } });
};

const getCategoryById = async (req, res) => {
  const category = await service.getCategoryById(req.params.id);
  res.json({ status: 'success', data: category });
};

const putCategoryById = async (req, res) => {
  await service.editCategoryById(req.params.id, req.body);
  res.json({ status: 'success', message: 'Category berhasil diperbarui' });
};

const deleteCategoryById = async (req, res) => {
  await service.deleteCategoryById(req.params.id);
  res.json({ status: 'success', message: 'Category berhasil dihapus' });
};

module.exports = {
  postCategory, getCategories, getCategoryById, putCategoryById, deleteCategoryById,
};
