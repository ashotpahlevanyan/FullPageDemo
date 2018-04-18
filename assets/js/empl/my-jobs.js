$(document).ready(function () {
    // toggle status select
    $(".statusSelect").click(function(){
        $(this).toggleClass("expanded");
    });
    // showing popup to confirm jobs deactivation
    $(".deactivate").on('click', function(e){
        e.preventDefault();
        $("#popupWrapper, #popupBackground").show();
        $(".popup .content").html('<p>This action will deactivate the job title ' + '"' + $(this).attr('data-title') + '"' + ' permanently. Are you sure you want to proceed?</p>');
        $(".popup a").attr("href", $(this).attr("href"));
        // vertical centering popup not depending from the height
        $(".popup").css({ "top" : "50%", "margin-top" : "-" + $( ".popup" ).height() / 2 + "px" }).show();
    });

    // default messages for pause and resume jobs
    var defaultPauseMsg = 'By pausing this job, you make it unavailable to job seekers and across our distribution network. Please confirm you would like to pause ';
    var defaultResumeMsg = 'Please confirm you would like to resume ';
    // showing popup to confirm pause and resume jobs
    $('.toggle_campaign').on('click', function(e) {
        e.preventDefault();
        $("#popupWrapper, #popupBackground").show();

        var $clicked = $(this),
            id = $(this).attr('data-id'),
            title = $(this).attr('data-title'),
            currentState = $(this).attr('data-state');

        var message = '';
        switch (currentState) {
            case 'fundingActive':
                message = defaultPauseMsg + 'the funding for ' + title + '?';
                break;
            case 'fundingPaused':
                message = defaultResumeMsg + 'the funding for ' + title + '?';
                break;
            case 'active':
                message = defaultPauseMsg + title + '?';
                break;
            case 'paused':
                message = defaultResumeMsg + title + '?';
                break;
        }

        // passing the message to popup and showing it
        $(".popup .content").html("<p>" + message + "</p>");
        // vertical centering popup not depending from the height
        $(".popup").css({ "top" : "50%", "margin-top" : "-" + $( ".popup" ).height() / 2 + "px" }).show();
        
        // confirm pause or resume jobs
        $('.confirm').on('click', function(e) {
            e.preventDefault();
            $("#popupWrapper, #popupBackground").hide();
            $.ajax({
                url: "/employers/pause-sponsored-job.php",
                type: "POST",
                data: { id: id },
                success: function(res) {
                    var obj = JSON.parse(res);
                    if (obj.status == 200) {
                        if ('active' == currentState || 'fundingActive' == currentState) {
                            $('#errorMessage')
                                .html(obj.message)
                                .show(0)
                                .hide(0);
                            $clicked.text('Resume');
                            $clicked.attr('data-state', 'fundingPaused');
                        } else {
                            $('#errorMessage')
                                .html(obj.message)
                                .show(0)
                                .hide(0);
                            $clicked.text('Pause');
                            $clicked.attr('data-state', 'active');
                        }
                        location.reload();
                    } else {
                        $('#errorMessage')
                            .html(obj.message)
                            .show(0)
                            .delay(5000)
                            .hide(0);
                    }
                }
            });
        });
    });

    // 30 days activation
    $(".activation").on('click', function(e){
        e.preventDefault();
        var id = $(this).data("job");
        _ = $(this);
        $.ajax({
            type: "POST",
            url: "/employers/my-jobs.php",
            data: 'repost_message=true&manage_page=true&job_id=' + id,
            success: function (msg) {
                _.parent().html(msg);
            }
        });
    });

    // closing popup
    $(".closePopup").click(function () {
        $("#popupWrapper, #popupBackground").hide();
    });
});
