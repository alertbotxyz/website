<script>
    import "../../styles/dashboard.css";

    export let tradeCount = 0;
    export let winCount = 0;
    export let winRate = 0;
    export let gainPerTrade = 0;
</script>
<div class="lifetime-stats ">
    <div class="stat-container first">
        <span class="title">Alerts</span>
        <span class="value">{tradeCount || 0}</span>
    </div>
    <div class="stat-container">
        <span class="title">Wins</span>
        <span class="value">{winCount || 0}</span>
    </div>
    <div class="stat-container">
        <span class="title">Win Rate</span>
        <span class="value">{parseFloat(winRate).toFixed(2) || 0}%</span>
    </div>
    <div class="stat-container">
        <span class="title">Avg Gain Per Trade</span>
        <span class="value">{parseFloat(gainPerTrade).toFixed(2) || 0}%</span>
    </div>
</div>