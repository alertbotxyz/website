<script>
    import TemplateForm from "../../../components/dashboard/templates/TemplateForm.svelte";
    import SuccessModal from "../../../components/modals/SuccessModal.svelte";
    import { createTemplate } from "../../../api/templates";
    import { addToast } from "../../../stores/toasts";

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
                    title: "There was an error creating the template"
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
    message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui totam animi voluptatem"
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
<TemplateForm 
    title="Create Template"
    on:submit={handleSubmit}
    {submitting}
    defaultTemplate={success ? {
            name: "",
            title: "",
            description: "",
            color: "#63ffd0",
            footer: {
                text: "",
                iconUrl: "",
            },
            thumbnail: {
                url: "",
            },
            author: {
                name: "",
                iconUrl: "",
            },
        } : undefined
    }
    type="create"
/>