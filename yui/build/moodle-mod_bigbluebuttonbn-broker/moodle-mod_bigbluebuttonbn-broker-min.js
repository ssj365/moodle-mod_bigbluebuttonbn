YUI.add("moodle-mod_bigbluebuttonbn-broker",function(t,e){M.mod_bigbluebuttonbn=M.mod_bigbluebuttonbn||{},M.mod_bigbluebuttonbn.broker={datasource:null,bigbluebuttonbn:{},init:function(e){this.datasource=new t.DataSource.Get({source:M.cfg.wwwroot+"/mod/bigbluebuttonbn/bbb_ajax.php?sesskey="+M.cfg.sesskey+"&"}),this.bigbluebuttonbn=e},joinRedirect:function(e){window.open(e)},recordingActionPerform:function(t){var e="action=recording_"+t.action+"&id="+t.recordingid+"&idx="+t.meetingid;e+=this.recordingActionMetaQS(t),t.attempt=1,"undefined"==typeof t.attempts&&(t.attempts=5),this.datasource.sendRequest({request:e,callback:{success:function(e){return e.data.status?"undefined"==typeof t.goalstate?M.mod_bigbluebuttonbn.recordings.recordingActionCompletion(t):t.attempts<=1?M.mod_bigbluebuttonbn.broker.recordingActionPerformedComplete(e,t):M.mod_bigbluebuttonbn.broker.recordingActionPerformedValidate(t):(t.message=e.data.message,M.mod_bigbluebuttonbn.recordings.recordingActionFailover(t))},failure:function(e){return t.message=e.error.message,M.mod_bigbluebuttonbn.recordings.recordingActionFailover(t)}}})},recordingActionMetaQS:function(e){var t,o="";return"undefined"!=typeof e.source&&((t={})[e.source]=encodeURIComponent(e.goalstate),o+="&meta="+JSON.stringify(t)),o},recordingActionPerformedValidate:function(t){var e="action=recording_info&id="+t.recordingid+"&idx="+t.meetingid;e+=this.recordingActionMetaQS(t),this.datasource.sendRequest({request:e,callback:{success:function(e){if(!M.mod_bigbluebuttonbn.broker.recordingActionPerformedComplete(e,t)){if(t.attempt<t.attempts)return t.attempt+=1,void setTimeout(function(){M.mod_bigbluebuttonbn.broker.recordingActionPerformedValidate(t)},1e3*(t.attempt-1));t.message=M.util.get_string("view_error_action_not_completed","bigbluebuttonbn"),M.mod_bigbluebuttonbn.recordings.recordingActionFailover(t)}},failure:function(e){t.message=e.error.message,M.mod_bigbluebuttonbn.recordings.recordingActionFailover(t)}}})},recordingActionPerformedComplete:function(e,t){return"undefined"==typeof e.data[t.source]?(t.message=M.util.get_string("view_error_current_state_not_found","bigbluebuttonbn"),M.mod_bigbluebuttonbn.recordings.recordingActionFailover(t),!0):e.data[t.source]===t.goalstate&&(M.mod_bigbluebuttonbn.recordings.recordingActionCompletion(t),!0)},recordingCurrentState:function(e,t){return"publish"===e||"unpublish"===e?t.published:"delete"===e?t.status:"protect"===e||"unprotect"===e?t.secured:"update"===e?t.updated:null},endMeeting:function(){var e="action=meeting_end&id="+this.bigbluebuttonbn.meetingid;e+="&bigbluebuttonbn="+this.bigbluebuttonbn.bigbluebuttonbnid,this.datasource.sendRequest({request:e,callback:{success:function(e){e.data.status&&(M.mod_bigbluebuttonbn.rooms.endMeeting(),location.reload())}}})},completionValidate:function(e){this.datasource.sendRequest({request:e,callback:{success:function(e){e.data.status&&(e=M.util.get_string("completionvalidatestatetriggered","bigbluebuttonbn"),M.mod_bigbluebuttonbn.helpers.alertError(e,"info"))}}})}}},"@VERSION@",{requires:["base","node","datasource-get","datasource-jsonschema","datasource-polling","moodle-core-notification"]});