<script>
    import SuccessModal from "../../../components/modals/SuccessModal.svelte";
    import { createTemplate } from "../../../api/templates";
    import { addToast } from "../../../stores/toasts";
    import CreateTemplate from "../../../components/dashboard/templates/CreateTemplate.svelte";

    $: success = false;
    $: submitting = false;

    const handleSubmit = e => {
        submitting = true;
        success = false;

        createTemplate(e.detail).then(({ data, status }) => {
            if (status > 299) {
                addToast({
                    type: "error",
                    message: data.message,
                    title: "There was an error creating the template",
                });
                
                success = false;
            } else {
                success = true;
            };
            submitting = false;
        });
    };

    const handleClose = () => {
        success = false;
    };
</script>

<SuccessModal
    active={success}
    title="Template created"
    message="Your template has been successfully created. You can now alert with it in the send alert tab."
    options={[
        {
            type: "button",
            text: "Create another template",
            color: "bg-dark-primary",
        },
        {
            type: "link",
            text: "Send an alert",
            color: "bg-accent",
            url: "/dashboard/templates/send-alert",
        },
    ]}
    on:close={handleClose}
/>
<CreateTemplate
    on:submit={handleSubmit}
    {submitting}
/>