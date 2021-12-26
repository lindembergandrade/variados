function getDate(node) {
    const dateNode = node.getElementsByClassName("bet-summary-detail-placement-date")[0];
    const date = dateNode.getElementsByClassName("bet-summary-detail-placement-date-date")[0].innerText;

    return date;
}

function getBetSelection(node) {
    const betSelectionNodes = node.getElementsByClassName("bet-summary-detail-bet-selection");

    let finalSelectionName = '';
    let finalSelectionOdd = 1;
    for (let childNode of betSelectionNodes) {
        const selectionOddNode = childNode.getElementsByClassName("bet-summary-detail-odds")[0];
        if (!selectionOddNode) continue;

        const selectionOdd = childNode.getElementsByClassName("bet-summary-detail-odds")[0].innerText;

        let selectionName;
        const betSelectionName = childNode.getElementsByClassName("bet-summary-detail-bet-selection-name")[0].innerText;
        if (betSelectionName === "Criar Aposta") selectionName = childNode.getElementsByClassName("bet-summary-detail-bet-selection-bet-builder-event")[0].innerText;
        else selectionName = childNode.getElementsByClassName("selection")[0].innerText;

        if (finalSelectionName == '') finalSelectionName = selectionName;
        else finalSelectionName += `, ${selectionName}`;

        finalSelectionOdd *= parseFloat(selectionOdd.replace(',', '.'));
    }

    finalSelectionOdd = `${parseFloat(`${finalSelectionOdd}`).toFixed(3)}`.replace('.', ',');

    return { finalSelectionName, finalSelectionOdd };
}

function getBetAmounts(node) {
    const amountNode = node.getElementsByClassName("bet-summary-detail-amounts")[0];

    const stakeNode = amountNode.getElementsByClassName("bet-summary-detail-amounts-total-stake-value")[0];
    const returnNode = amountNode.getElementsByClassName("bet-summary-detail-amounts-return-value")[0];

    const stakeValue = `${parseFloat(stakeNode.innerText.split('R$')[1].replace(',', '.'))}`.replace('.', ',');
    const returnValue = `${parseFloat(returnNode.innerText.split('R$')[1].replace(',', '.'))}`.replace('.', ',');

    return { stakeValue, returnValue };
}

(() => {
    const summaryDetailList = document.getElementsByClassName("bet-summary-detail");

    let finalTxt = '';
    for (let summaryDetail of summaryDetailList) {
        const date = getDate(summaryDetail);
        const { finalSelectionName, finalSelectionOdd } = getBetSelection(summaryDetail);
        const { stakeValue, returnValue } = getBetAmounts(summaryDetail);
        // console.log(`${date}|${finalSelectionName}|${finalSelectionOdd}|${stakeValue}|${returnValue}`);
        finalTxt += `${date}|${finalSelectionName}|${finalSelectionOdd}|${stakeValue}|${returnValue}\n`;
    }
    console.log(finalTxt);
})();