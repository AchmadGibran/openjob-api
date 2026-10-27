const Joi = require('joi');

const userPayload = Joi.object({
  name: Joi.string().max(100).required(),
  email: Joi.string().email().max(100).required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().max(20).optional(),
});

const loginPayload = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const refreshTokenPayload = Joi.object({
  refreshToken: Joi.string().required(),
});

const companyPayload = Joi.object({
  name: Joi.string().max(150).required(),
  location: Joi.string().max(150).required(),
  description: Joi.string().required(),
});

const companyUpdatePayload = Joi.object({
  name: Joi.string().max(150).optional(),
  location: Joi.string().max(150).optional(),
  description: Joi.string().optional(),
});

const categoryPayload = Joi.object({
  name: Joi.string().max(100).required(),
});

const jobPayload = Joi.object({
  company_id: Joi.string().required(),
  category_id: Joi.string().required(),
  title: Joi.string().max(200).required(),
  description: Joi.string().required(),
  job_type: Joi.string().max(50).allow('', null).optional(),
  experience_level: Joi.string().max(50).allow('', null).optional(),
  location_type: Joi.string().max(50).allow('', null).optional(),
  location_city: Joi.string().max(100).allow('', null).optional(),
  salary_min: Joi.number().integer().min(0).allow(null).optional(),
  salary_max: Joi.number().integer().min(Joi.ref('salary_min')).allow(null).optional(),
  is_salary_visible: Joi.boolean().optional(),
  status: Joi.string().max(30).optional(),
});

const jobQuery = Joi.object({
  title: Joi.string().allow('').optional(),
  'company-name': Joi.string().allow('').optional(),
});

const applicationPayload = Joi.object({
  job_id: Joi.string().required(),
  cover_letter: Joi.string().allow('', null).optional(),
  status: Joi.string().valid('pending', 'accepted', 'rejected').optional(),
});

const applicationStatusPayload = Joi.object({
  status: Joi.string().valid('pending', 'accepted', 'rejected').required(),
});

module.exports = {
  userPayload,
  loginPayload,
  refreshTokenPayload,
  companyPayload,
  companyUpdatePayload,
  categoryPayload,
  jobPayload,
  jobQuery,
  applicationPayload,
  applicationStatusPayload,
};
