function Get-Percentile {
    param (
        [Parameter(Mandatory = $true)]
        [double[]]$Array,
        [Parameter(Mandatory = $true)]
        [double]$Percentile
    )

    if ($Array.Count -eq 0) {
        return 0
    }

    $sortedArray = $Array | Sort-Object -Descending
    $n = $sortedArray.Count
    $index = ($n - 1) * $Percentile / 100

    if ($index -eq [math]::Floor($index)) {
        return $sortedArray[$index]
    }
    else {
        $lower = [math]::Floor($index)
        $upper = [math]::Ceiling($index)
        $weight = $index - $lower
        return $sortedArray[$lower] * (1 - $weight) + $sortedArray[$upper] * $weight
    }
}

function Generate-BenchmarkData {
    param (
        [Parameter(Mandatory = $true)]
        [string]$RootDirectoryPath
    )

    if (-not (Test-Path -Path $RootDirectoryPath)) {
        throw "Directory not found: $RootDirectoryPath"
    }

    $jsonFiles = Get-ChildItem -Path $RootDirectoryPath -Recurse -Filter *.json

    foreach ($FilePath in $jsonFiles) {
        Write-Host "Processing file: $FilePath"
        $file = Get-Content -Path $FilePath -Raw
        $data = $file | ConvertFrom-Json

        $frameTimes = @()
        foreach ($run in $data.Runs) {
            $frameTimes += $run.CaptureData.MsBetweenPresents
        }
        $totalFrames = $frameTimes.Count
        $totalTime = ($frameTimes | Measure-Object -Sum).Sum
        $avgFPS = if ($totalTime -gt 0) { 1000 * $totalFrames / $totalTime } else { 0 }
        $onePercentLow = Get-Percentile -Array $frameTimes -Percentile 1
        $pointOnePercentLow = Get-Percentile -Array $frameTimes -Percentile 0.1

        $benchmarkData = [PSCustomObject]@{
            # Metadata
            Hash               = $data.Hash
            AppVersion         = $data.Info.AppVersion
            Id                 = $data.Info.Id
            Processor          = $data.Info.Processor
            GameName           = $data.Info.GameName
            ProcessName        = $data.Info.ProcessName
            CreationDate       = $data.Info.CreationDate
            Motherboard        = $data.Info.Motherboard
            OS                 = $data.Info.OS
            SystemRam          = $data.Info.SystemRam
            BaseDriverVersion  = $data.Info.BaseDriverVersion
            GPUDriverVersion   = $data.Info.GPUDriverVersion
            DriverPackage      = $data.Info.DriverPackage
            GPU                = $data.Info.GPU
            GPUCount           = $data.Info.GPUCount
            GpuCoreClock       = $data.Info.GpuCoreClock
            GpuMemoryClock     = $data.Info.GpuMemoryClock
            Comment            = if ($null -ne $data.Info.Comment) { $data.Info.Comment } else { 'No comment' }
            ApiInfo            = $data.Info.ApiInfo
            ResizableBar       = $data.Info.ResizableBar
            WinGameMode        = $data.Info.WinGameMode
            HAGS               = if ($null -ne $data.Info.HAGS) { $data.Info.HAGS } else { 'Unsupported' }
            PresentationMode   = $data.Info.PresentationMode

            # Benchmark results

            TotalFrames        = $totalFrames
            TotalTime          = $totalTime
            AvgFPS             = $avgFPS
            OnePercentLow      = if ($onePercentLow -gt 0) { 1000 / $onePercentLow } else { 0 }
            PointOnePercentLow = if ($pointOnePercentLow -gt 0) { 1000 / $pointOnePercentLow } else { 0 }
        }

        # Save as csv file
        $benchmarkData | Export-Csv -Path ($FilePath -replace '\.json$', '.csv') -NoTypeInformation -Delimiter ';'
        Write-Host "Generated CSV for $FilePath"
    }

    # Create importable JavaScript array for each folder, containing all CSV files in that folder
    $directories = $jsonFiles | ForEach-Object { $_.DirectoryName } | Sort-Object -Unique
    foreach ($dir in $directories) {
        $csvFiles = Get-ChildItem -Path $dir -Filter *.csv
        $jsArrayContent = "export const benchmarkFiles = ["
        foreach ($csvFile in $csvFiles) {
            $relativePath = $csvFile.Name;
            $jsArrayContent += "`n    `"$relativePath`","
        }
        $jsArrayContent = $jsArrayContent.TrimEnd(',') + "`n];`n"
        
        # Replace all backslashes with forward slashes for JavaScript compatibility
        $jsArrayContent = $jsArrayContent -replace '\\', '/'

        $jsFilePath = Join-Path -Path $dir -ChildPath "benchmarkFiles.js"
        Set-Content -Path $jsFilePath -Value $jsArrayContent
    }

    Write-Host "Benchmark data generation completed."
}

Generate-BenchmarkData -RootDirectoryPath ".\benchmarks"