/* Start add value to cart */
function add_value_to_cart(checkValue, block_id, block_name){
    let cbs = document.querySelectorAll(`.tbi[name="properties[${ block_name }]"]`);
    let el = document.createElement('input')

    el.setAttribute('id',`tadabbur-app-${ block_id }-input`)
    el.setAttribute("name",`properties[${ block_name }]`)
    el.setAttribute("type","hidden")
    
    document.querySelector('.js-product-form-main').append(el)

    for(cb of cbs){
        cb.addEventListener("change", function(e) {
            updateHiddenInput(checkValue, block_id, block_name)
        }, false)
    }

    updateHiddenInput(checkValue, block_id, block_name)
}

function removeLastComma(inputString) {
    if (inputString.endsWith(',')) {
        return inputString.slice(0, -1);
    } else {
        return inputString;
    }
}

function updateHiddenInput(checkValue, block_id, block_name) {
    var inputs = null
    if(checkValue){
        inputs = document.querySelectorAll(`.tbi[name="properties[${ block_name }]"]:checked`)
    }else{
        inputs = document.querySelectorAll(`.tbi[name="properties[${ block_name }]"]`)
    }
    var hiddenInput = document.getElementById(`tadabbur-app-${ block_id }-input`);
    var values = Array.from(inputs).map(function(input) {
        return input.value;
    });
    hiddenInput.value = removeLastComma(values.join(','))
}
/* End add value to cart */

/* Start Rules */
function applyRules(block_id, checkValue, rules){
    if(rules.length){
        for(rule of rules){
            let showRule = rule.split('->')
            let show = true;
            if(showRule.length > 1){
                let block = document.querySelector(`[data-tadabbur-app-title="${showRule[1].trim()}"]`)
                if(checkValue){
                    if(document.querySelector(`.tadabbur-app-${ block_id }-block .tbi[value="${showRule[0].trim()}"]`).checked){
                        show = true
                    }else{
                        show = false
                    }
                }else{
                    if(document.querySelector(`.tadabbur-app-${ block_id }-block .tbi`).value == showRule[0].trim()){
                        show = true
                    }else{
                        show = false
                    }
                }
                show && block && (block.style.display = "block")
                !show && block && (block.style.display = "none")
            }

            let hideRule = rule.split('-x')
            let hide = true;
            if(hideRule.length > 1){
                let block = document.querySelector(`[data-tadabbur-app-title="${hideRule[1].trim()}"]`)

                if(checkValue){
                    if(document.querySelector(`.tadabbur-app-${ block_id }-block .tbi[value="${hideRule[0].trim()}"]`).checked){
                        hide = true
                    }else{
                        hide = false
                    }
                }else{
                    if(document.querySelector(`.tadabbur-app-${ block_id }-block .tbi`).value == hideRule[0].trim()){
                        hide = true
                    }else{
                        hide = false
                    }
                }
                hide && block && (block.style.display = "none")
                !hide && block && (block.style.display = "block")
            }
        }
    }
}

function haveRules(checkValue, block_id, block_name, rules){
    let cbs = document.querySelectorAll(`.tbi[name="properties[${ block_name }]"]`)
    for(cb of cbs){
        cb.addEventListener("change", function(e) {
            applyRules(block_id, checkValue, rules)
        }, false)
    }
    applyRules(block_id, checkValue, rules)
}
/* End Rules */