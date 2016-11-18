const increment = 5;

$('.btn-number').click(function(e) {
    e.preventDefault();

    var fieldName = $(this).attr('data-field');
    var type      = $(this).attr('data-type');
    var input     = $("input[name='" + fieldName + "']")
    var curVal    = parseInt(input.val());

    if (!isNaN(curVal)) {
        if (type == 'minus') {
            var minVal = parseInt(input.attr('min'));
            if (curVal > minVal + increment) { curVal -= increment; }
            else                             { curVal = minVal; }
            input.val(curVal).change();
            /*
            if (curVal <= minVal) { $(this).attr('disabled', true);  }
            else                  { $(this).attr('disabled', false); }
            */
        }
        else if (type == 'plus') {
            var maxVal = parseInt(input.attr('max'));
            if (curVal < maxVal - increment) { curVal += increment; }
            else                             { curVal = maxVal; }
            input.val(curVal).change();
            /*
            if (curVal >= maxVal) { $(this).attr('disabled', true);  }
            else                  { $(this).attr('disabled', false); }
            */
        }
    }
    else {
        input.val(input.attr('min'));
    }

    function minusChange(context) {
        if (curVal > input.attr('min')) {
            input.val(curVal - 5).change();
        }
        if (parseInt(input.val()) == input.attr('min')) {
           $(context).attr('disabled', true); 
        }
    }

    function plusChange(context) {
        if (curVal < input.attr('max')) {
            input.val(curVal + 5).change();
        }
        if (parseInt(input.val()) == input.attr('max')) {
            $(this).attr('disabled', true);
        }
    }
});

$('.input-number').focusin(function() {
    $(this).data('oldValue', $(this).val());
});













