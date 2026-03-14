import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      enum: ['ROLE_CHANGED', 'USER_DELETED', 'USER_CREATED'],
      required: true,
    },
    targetUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    before: Object, // ✅ data មុនកែ
    after: Object, // ✅ data បន្ទាប់កែ
  },
  { timestamps: true },
);

const AuditLog = mongoose.model('AuditLog', auditLogSchema);
export default AuditLog;
