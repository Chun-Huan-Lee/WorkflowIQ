"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testTypes = testTypes;
// Test file to verify all exports are working correctly
const user_1 = require("./types/user");
const workflow_1 = require("./types/workflow");
const process_1 = require("./types/process");
// Test that all types can be used
function testTypes() {
    console.log('All types imported successfully!');
    // Test user types
    const userRole = user_1.UserRole.ADMIN;
    const userStatus = user_1.UserStatus.ACTIVE;
    // Test workflow types
    const workflowStatus = workflow_1.WorkflowStatus.ACTIVE;
    // Test process types
    const processStatus = process_1.ProcessStatus.DISCOVERED;
    return {
        userRole,
        userStatus,
        workflowStatus,
        processStatus
    };
}
//# sourceMappingURL=test-exports.js.map