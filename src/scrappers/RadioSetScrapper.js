class RadioSetScrapper {

    findRadioSets() {
        let allRadioInputs = document.querySelectorAll("input[type='radio']");
        for (let i = 0; i < allRadioInputs; i++) {
            let radioSetName = allRadioInputs[i].getAttribute("name");
            let radioSetElements = document.querySelectorAll("input[name='" + radioSetName + "']");
        }

    }
}