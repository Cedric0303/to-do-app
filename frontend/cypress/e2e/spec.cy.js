describe("E2E test", () => {
    beforeEach(() => {
        cy.visit(Cypress.env("FRONTEND_URL"));
        cy.get(".clearButton > button").click();
    });

    it("Test 1: Add new activity", () => {
        const activityText = "Finish testing frontend 0303";
        cy.get(".textInput").type(activityText);
        cy.get(".submitButton > button").click();
        cy.contains(activityText);
    });
    it("Test 2: Add multiple activity", () => {
        // Add 2 activities back to back
        const activityText1 = "Finish testing frontend 0303";
        const activityText2 = "Finish E2E testing frontend 0303";
        cy.get(".textInput").type(activityText1);
        cy.get(".submitButton > button").click();
        cy.wait(1000);
        cy.get(".textInput").type(activityText2);
        cy.get(".submitButton > button").click();
        cy.contains(activityText1);
        cy.contains(activityText2);
    });
    it("Test 3: Toggle activity done", () => {
        const activityText = "Toggle activity done state 0303";
        cy.get(".textInput").type(activityText);
        cy.get(".submitButton > button").click();
        cy.wait(500);
        cy.get(".doneCell").click();
        cy.get(".doneCell").contains("✅");
        cy.wait(500);
        cy.get(".doneCell").click();
        cy.get(".doneCell").not("✅");
    });
    it("Test 4: Delete an activity", () => {
        const activityText = "Delete activity 0303";
        cy.get(".textInput").type(activityText);
        cy.get(".submitButton > button").click();
        cy.wait(500);
        cy.get(".deleteButton").click();
        cy.get("body").not("Delete activity");
    });
    it("Test 5: Edit an activity", () => {
        // Edit an activity, submit it, edit again, and cancel it
        const activityText = "Edit activity 0303";
        const editText = "Edit activity 0303";
        const cancelText = "Should I edit again? 0303";
        cy.get(".textInput").type(activityText);
        cy.get(".submitButton > button").click();
        cy.wait(500);
        cy.get(".editButton").click();
        cy.get(".modal-body > form > .textInput").clear().type(editText);
        cy.get("#timeCheckbox").click();
        cy.get(".float-right").click();
        cy.contains(editText);
        cy.wait(500);
        cy.get(".editButton").click();
        cy.get(".modal-body > form > .textInput").clear().type(cancelText);
        cy.get(".float-left").click();
        cy.contains(editText);
    });

    it("Test 1: Delete all activities", () => {
        // Create 10 activities, then press delete all button
        const activityText = "Delete all activities 0303";
        for (let i = 0; i < 10; i++) {
            cy.get(".textInput").type(activityText);
            cy.get(".submitButton > button").click();
            cy.wait(1000);
        }
        cy.get(".clearButton > button").click();
        cy.wait(500);
        cy.get("body").not(activityText);
    });
});
