import mongoose from 'mongoose';

async function fetchSchemaFields() {
    const CustomFieldModel = mongoose.model('CustomField');
    return await CustomFieldModel.find({ moduleName: "Properties" });
}

const propertySchema = new mongoose.Schema({
    propertyPhotos: [],
    virtualToursOrVideos: [],
    floorPlans: [],
    propertyDocuments: [],
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

async function initializePropertySchema() {
    const schemaFieldsData = await fetchSchemaFields();
    schemaFieldsData[0]?.fields?.forEach((item) => {
        propertySchema.add({ [item.name]: item?.backendType });
    });
}

const Property = mongoose.model('Properties', propertySchema, 'Properties');
export { Property, initializePropertySchema };
