/**
 * Created by nick on 4/30/16.
 *
 * All code handing form in javascript should be in this file
 */

var SampleForm = SampleForm || {};

/**
 * This class handles all the javascript code to handle for a form.
 * @param formId The ID of the form to work with.
 * @constructor
 */
SampleForm.Form = function(formId) {
    this.formId = formId;
};

/**
 * Setup form to submit using AjaxForm jQuery plugin
 * @param targetUrl
 * @param formData
 */
SampleForm.Form.prototype.setupAjaxForm = function(targetUrl, formData) {
    // console.log('formId: ', this.formId);
    // console.log('targetUrl: ', targetUrl);
    // console.log('formData: ', formData);

    var formSel = '#'+this.formId;
    var formOptions = {
        data: formData,
        dataType: 'json',
        resetForm: true,
        beforeSerialize: function($form, options) {
            $form.block();
        },
        success: function(responseData, statusText, xhr, element) {
            // console.log('Success!');
            // console.log(arguments);

            if (responseData.process_result) {
                if (responseData.process_message) {
                    jQuery('<div>'+responseData.process_message+'</div>').dialog({
                        position: {
                            my: "center",
                            at: "center",
                            of: formSel
                        },
                        show: true,
                        hide: true,
                        modal: false,
                        draggable: false,
                        resizable: false,
                        close: function( event, ui ) {
                            jQuery(formSel).unblock();
                        },
                        buttons: {
                            Ok: function() {
                                jQuery( this ).dialog('close');
                            }
                        }
                    });
                }
            }
        },
        error: function() {
            console.log('Error!');
            console.log(arguments);
            window.alert('Error occurred on form submit!');
            jQuery(formSel).unblock();
        },
        type: 'POST',
        url: targetUrl
    };

    jQuery(formSel).ajaxForm(formOptions);

    // console.log('Complete setupAjaxForm');
};