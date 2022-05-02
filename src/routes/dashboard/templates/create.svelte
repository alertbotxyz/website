<script>
    import TemplateForm from "../../../components/dashboard/templates/TemplateForm.svelte";
    import { createTemplate } from "../../../api/templates";

    $: error = "";

    const handleSubmit = e => {
        createTemplate(e.detail).then(({ data, status }) => {
            console.log(data);
            if (status !== 200) error = data.message;
            else error = "";
        });
    };
</script>

<span class="text-error ml-16">{error}</span>
<TemplateForm 
    title="Create Template"
    on:submit={handleSubmit}
/>