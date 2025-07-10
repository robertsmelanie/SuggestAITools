function advisorApp() {
    return {
        jobListing: '',
        tasks: [],
        tools: [],
        manualHours: 0,
        aiHours: 0,
        marketRate: 50,
        toolCosts: 0,
        profitMargin: 20,
        projectCost: 0,
        hourlyRate: 0,

        analyze() {
            // TODO: Integrate AI parsing here
            // Placeholder logic:
            this.tasks = ['Task 1 example', 'Task 2 example', 'Task 3 example'];
            this.tools = [
                { name: 'ChatGPT', benefit: 'Quickly draft and refine text', link: 'https://chat.openai.com' },
                { name: 'Grammarly', benefit: 'Grammar and style checking', link: 'https://grammarly.com' }
            ];
            this.manualHours = 12;
            this.aiHours = 5;
            this.calculateRates();
            this.scrollTo('tasks');
        },

        calculateRates() {
            this.hourlyRate = ((this.marketRate + this.toolCosts / this.aiHours) * (1 + this.profitMargin / 100)).toFixed(2);
            this.projectCost = (this.aiHours * this.hourlyRate).toFixed(2);
        },

        scrollTo(sectionId) {
            document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
        },

        copyAll() {
            const content = document.getElementById('all-output').innerText;
            navigator.clipboard.writeText(content);
            alert('Copied to clipboard!');
        },

        savePDF() {
            window.print();
        }
    };
}