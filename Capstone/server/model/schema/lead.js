import mongoose from 'mongoose';

async function fetchSchemaFields() {
    const CustomFieldModel = mongoose.model('CustomField');
    return await CustomFieldModel.find({ moduleName: "Leads" });
}

const leadSchema = new mongoose.Schema({
    deleted: {
        type: Boolean,
        default: false,
    },
    updatedDate: {
        type: Date,
        default: Date.now
    },
    createdDate: {
        type: Date,
    },
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

async function initializeLeadSchema() {
    const schemaFieldsData = await fetchSchemaFields();
    schemaFieldsData[0]?.fields?.forEach((item) => {
        leadSchema.add({ [item.name]: item?.backendType });
    });
}

const Lead = mongoose.model('Leads', leadSchema, 'Leads');
export { Lead, initializeLeadSchema };
