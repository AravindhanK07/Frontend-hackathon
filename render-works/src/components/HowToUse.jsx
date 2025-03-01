import React from "react";

const HowToUse = () => {
  return (
    <div className="p-6 text-lg text-gray-800 space-y-6">
      <p>
        <strong>User authentication</strong> is a crucial part of the system,
        allowing users to register and log in securely. To register, users need
        to click on the
        <strong> "Register" </strong> button and fill in their details,
        including name, email, and password. Once the form is submitted, an
        account is created.
      </p>

      <p>
        For logging in, users must enter their registered email and password,
        then click on the <strong>"Login"</strong> button to access the system.
        If they forget their password, a <strong>"Forgot Password"</strong>{" "}
        option is available to reset it.
      </p>

      <p>
        <strong>The dashboard</strong> provides real-time insights into key
        business metrics through visualizations. It displays total sales for the
        year, total business expenses incurred, and net profit, which represents
        the difference between sales and expenses. Users can also view the{" "}
        <strong>top five best-selling products</strong> and the most in-demand
        SKUs under the <strong>"Want to Purchase" (WTP)</strong> section.
      </p>

      <p>
        Additionally, the dashboard showcases the net profit margin after
        deducting all expenses and the <strong>expense-to-sales ratio</strong>{" "}
        to help monitor operational cost efficiency. It also tracks revenue lost
        due to stockouts and calculates SKU holding costs for inventory.
      </p>

      <p>
        Metrics such as the <strong>average transaction value (ATV)</strong>,{" "}
        <strong>footfall conversion rate</strong>, and monthly comparisons of
        expenses versus sales further enhance business decision-making.
      </p>

      <p>
        <strong>The sales module</strong> facilitates the entry of new sales
        records. Users can add a new entry by clicking the{" "}
        <strong>"Add" (+)</strong> icon, which opens a form where they can enter
        details such as invoice number, ordered date, amount before tax, tax,
        and total amount including tax.
      </p>

      <p>
        They must also specify the status of the transaction—whether it is{" "}
        <strong>pending, paid, or cancelled</strong>—along with the payment
        method, which could be <strong>cash, card, or UPI</strong>. After
        submitting the form, the sales record is saved, ensuring accurate
        tracking of transactions.
      </p>

      <p>
        <strong>The purchase module</strong> enables efficient management of
        vendor purchases. To add a new purchase record, users click on the{" "}
        <strong>"Add" (+)</strong> icon, which opens a form requiring details
        such as{" "}
        <strong>
          purchase ID, vendor ID, invoice number, purchase date, product name,
          SKU code, amount before tax, tax,
        </strong>{" "}
        and <strong>total amount including tax</strong>.
      </p>

      <p>
        They also need to indicate the <strong>payment method</strong> and the{" "}
        <strong>transaction status</strong>. Once submitted, the record is
        saved, allowing for streamlined vendor and purchase management.
      </p>

      <p>
        <strong>For managing expenses</strong>, the account management module
        provides a structured approach to recording financial transactions.
        Users can log an expense by clicking on the <strong>"Add" (+)</strong>{" "}
        icon in the balance sheet module, which opens a form where they must
        enter details such as{" "}
        <strong>
          expense category (fixed or variable), amount, due date, status (paid,
          pending, or overdue),
        </strong>{" "}
        and <strong>payment method</strong>.
      </p>

      <p>
        Submitting the form ensures that expenses are recorded systematically,
        contributing to better financial management.
      </p>

      <p>
        To assist users in navigating these modules efficiently, a{" "}
        <strong>video demonstration</strong> is available, providing a
        step-by-step walkthrough of the system.
      </p>

      <p>
        By following this guide, users can effectively manage{" "}
        <strong>sales, purchases, and expenses</strong>, ensuring accurate
        tracking and smooth business operations.
      </p>
    </div>
  );
};

export default HowToUse;
