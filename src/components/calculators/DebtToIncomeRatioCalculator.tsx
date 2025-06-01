import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const DebtToIncomeRatioCalculator: React.FC = () => {
  const [salaryWages, setSalaryWages] = useState('');
  const [overtimePay, setOvertimePay] = useState('');
  const [bonusesCommissions, setBonusesCommissions] = useState('');
  const [rentalIncome, setRentalIncome] = useState('');
  const [investmentIncome, setInvestmentIncome] = useState('');
  const [pensionSocialSecurity, setPensionSocialSecurity] = useState('');
  const [selfEmploymentIncome, setSelfEmploymentIncome] = useState('');
  const [spousalHouseholdIncome, setSpousalHouseholdIncome] = useState('');
  const [alimonyChildSupportReceived, setAlimonyChildSupportReceived] = useState('');

  const [mortgagePITI, setMortgagePITI] = useState('');
  const [carPayments, setCarPayments] = useState('');
  const [studentLoanPayments, setStudentLoanPayments] = useState('');
  const [personalLoans, setPersonalLoans] = useState('');
  const [minimumCreditCardPayments, setMinimumCreditCardPayments] = useState('');
  const [businessLoans, setBusinessLoans] = useState('');
  const [childSupportPaid, setChildSupportPaid] = useState('');
  const [alimonyPaid, setAlimonyPaid] = useState('');
  const [otherDebtPayments, setOtherDebtPayments] = useState('');
  const [calculatedDti, setCalculatedDti] = useState<number | null>(null);
  const [dtiInterpretation, setDtiInterpretation] = useState('');

  const handleClearFields = () => {
    setGrossMonthlyIncome('');
    setMonthlyHousingPayment('');
    setCarPayments('');
    setStudentLoanPayments('');
    setMinimumCreditCardPayments('');
    setOtherDebtPayments('');
    setCalculatedDti(null);
    setDtiInterpretation('');
  };

  useEffect(() => {
    const incomeSources = [
      salaryWages, overtimePay, bonusesCommissions, rentalIncome, investmentIncome,
      pensionSocialSecurity, selfEmploymentIncome, spousalHouseholdIncome, alimonyChildSupportReceived
    ];
    const totalGrossMonthlyIncome = incomeSources.reduce((sum, income) => sum + parseFloat(income || '0'), 0);

    const debtObligations = [
      mortgagePITI, carPayments, studentLoanPayments, personalLoans,
      minimumCreditCardPayments, businessLoans, childSupportPaid, alimonyPaid, otherDebtPayments
    ];
    const totalMonthlyDebtPayments = debtObligations.reduce((sum, debt) => sum + parseFloat(debt || '0'), 0);

    if (totalGrossMonthlyIncome > 0) {
      const dti = (totalMonthlyDebtPayments / totalGrossMonthlyIncome) * 100;
      setCalculatedDti(dti);

      if (dti < 36) {
        setDtiInterpretation('Excellent DTI');
      } else if (dti >= 36 && dti <= 43) {
        setDtiInterpretation('Good DTI');
      } else {
        setDtiInterpretation('Poor DTI');
      }
    } else {
      setCalculatedDti(null);
      setDtiInterpretation('');
    }
  }, [salaryWages, overtimePay, bonusesCommissions, rentalIncome, investmentIncome, pensionSocialSecurity, selfEmploymentIncome, spousalHouseholdIncome, alimonyChildSupportReceived, mortgagePITI, carPayments, studentLoanPayments, personalLoans, minimumCreditCardPayments, businessLoans, childSupportPaid, alimonyPaid, otherDebtPayments]);

  const handleCopyResults = () => {
    if (calculatedDti !== null) {
      navigator.clipboard.writeText(`Debt-to-Income Ratio: ${calculatedDti.toFixed(2)}% - ${dtiInterpretation}`);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Debt-to-Income Ratio Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <h3 className="text-lg font-semibold">Gross Monthly Income Sources</h3>
            <div className="grid gap-2">
              <Label htmlFor="salaryWages">Salary/Wages</Label>
              <Input
                id="salaryWages"
                type="number"
                value={salaryWages}
                onChange={(e) => setSalaryWages(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="overtimePay">Overtime Pay</Label>
              <Input
                id="overtimePay"
                type="number"
                value={overtimePay}
                onChange={(e) => setOvertimePay(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bonusesCommissions">Bonuses/Commissions</Label>
              <Input
                id="bonusesCommissions"
                type="number"
                value={bonusesCommissions}
                onChange={(e) => setBonusesCommissions(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="rentalIncome">Rental Income</Label>
              <Input
                id="rentalIncome"
                type="number"
                value={rentalIncome}
                onChange={(e) => setRentalIncome(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="investmentIncome">Investment Income</Label>
              <Input
                id="investmentIncome"
                type="number"
                value={investmentIncome}
                onChange={(e) => setInvestmentIncome(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pensionSocialSecurity">Pension/Social Security</Label>
              <Input
                id="pensionSocialSecurity"
                type="number"
                value={pensionSocialSecurity}
                onChange={(e) => setPensionSocialSecurity(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="selfEmploymentIncome">Self-Employment Income</Label>
              <Input
                id="selfEmploymentIncome"
                type="number"
                value={selfEmploymentIncome}
                onChange={(e) => setSelfEmploymentIncome(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="spousalHouseholdIncome">Spousal/Household Income</Label>
              <Input
                id="spousalHouseholdIncome"
                type="number"
                value={spousalHouseholdIncome}
                onChange={(e) => setSpousalHouseholdIncome(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="alimonyChildSupportReceived">Alimony/Child Support (Received)</Label>
              <Input
                id="alimonyChildSupportReceived"
                type="number"
                value={alimonyChildSupportReceived}
                onChange={(e) => setAlimonyChildSupportReceived(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <h3 className="text-lg font-semibold">Monthly Debt Obligations</h3>
            <div className="grid gap-2">
              <Label htmlFor="mortgagePITI">Mortgage (PITI)</Label>
              <Input
                id="mortgagePITI"
                type="number"
                value={mortgagePITI}
                onChange={(e) => setMortgagePITI(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="carPayments">Auto Loans</Label>
              <Input
                id="carPayments"
                type="number"
                value={carPayments}
                onChange={(e) => setCarPayments(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="studentLoanPayments">Student Loans</Label>
              <Input
                id="studentLoanPayments"
                type="number"
                value={studentLoanPayments}
                onChange={(e) => setStudentLoanPayments(e.target.value)}
              />
            </div>
             <div className="grid gap-2">
              <Label htmlFor="personalLoans">Personal Loans</Label>
              <Input
                id="personalLoans"
                type="number"
                value={personalLoans}
                onChange={(e) => setPersonalLoans(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="minimumCreditCardPayments">Credit Cards (minimum payment)</Label>
              <Input
                id="minimumCreditCardPayments"
                type="number"
                value={minimumCreditCardPayments}
                onChange={(e) => setMinimumCreditCardPayments(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="businessLoans">Business Loans</Label>
              <Input
                id="businessLoans"
                type="number"
                value={businessLoans}
                onChange={(e) => setBusinessLoans(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="childSupportPaid">Child Support (Paid)</Label>
              <Input
                id="childSupportPaid"
                type="number"
                value={childSupportPaid}
                onChange={(e) => setChildSupportPaid(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="alimonyPaid">Alimony (Paid)</Label>
              <Input
                id="alimonyPaid"
                type="number"
                value={alimonyPaid}
                onChange={(e) => setAlimonyPaid(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="otherDebtPayments">Other Recurring Debts</Label>
              <Input
                id="otherDebtPayments"
                type="number"
                value={otherDebtPayments}
                onChange={(e) => setOtherDebtPayments(e.target.value)}
              />
            </div>
          </div>

          {calculatedDti !== null && (
            <div className="mt-4 text-center">
              <h3 className="text-xl font-semibold">Calculated Debt-to-Income Ratio:</h3>
              <p className="text-2xl font-bold text-primary">{calculatedDti.toFixed(2)}%</p>
              <p className={`text-lg italic ${dtiInterpretation === 'Excellent DTI' ? 'text-green-600' : dtiInterpretation === 'Good DTI' ? 'text-yellow-600' : 'text-red-600'}`}>
                {dtiInterpretation}
              </p>
            </div>
          )}

          <div className="flex justify-center gap-4 mt-6">
            <Button onClick={handleCopyResults} disabled={calculatedDti === null}>
              Copy Results
            </Button>
            <Button variant="outline" onClick={handleClearFields}>
              Clear Fields
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DebtToIncomeRatioCalculator;


          type="number"
          value={carPayments}
          onChange={(e) => setCarPayments(e.target.value)}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Student Loan Payments:</label>
        <input
          type="number"
          value={studentLoanPayments}
          onChange={(e) => setStudentLoanPayments(e.target.value)}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Minimum Credit Card Payments:</label>
        <input
          type="number"
          value={minimumCreditCardPayments}
          onChange={(e) => setMinimumCreditCardPayments(e.target.value)}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Other Monthly Debt Payments:</label>
        <input
          type="number"
          value={otherDebtPayments}
          onChange={(e) => setOtherDebtPayments(e.target.value)}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>

      {calculatedDti !== null && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <h3>Calculated Debt-to-Income Ratio:</h3>
          <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{calculatedDti.toFixed(2)}%</p>
          <p style={{ fontStyle: 'italic' }}>{dtiInterpretation}</p>
        </div>
      )}

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button
          onClick={handleCopyResults}
          disabled={calculatedDti === null}
          style={{ padding: '10px 15px', marginRight: '10px', cursor: 'pointer' }}
        >
          Copy Results
        </button>
        <button
          onClick={handleClearFields}
          style={{ padding: '10px 15px', cursor: 'pointer' }}
        >
          Clear Fields
        </button>
      </div>
    </div>
  );
};

export default DebtToIncomeRatioCalculator;