import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class PCFColorPicker implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private container: HTMLDivElement;
    private colorInput: HTMLInputElement;
    private rgbaValue: string;
    private notifyOutputChanged: () => void;

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this.container = container;
        this.render();
    }

    private render(): void {
        const wrapper = document.createElement("div");
        wrapper.className = "color-picker";

        const label = document.createElement("label");
        label.innerText = "PCF Componente - Escolha uma cor";

        this.colorInput = document.createElement("input");
        this.colorInput.type = "color";

        this.colorInput.addEventListener("input", () => {
            this.rgbaValue = this.hexToRgba(this.colorInput.value);
            this.notifyOutputChanged();
        });

        wrapper.appendChild(label);
        wrapper.appendChild(this.colorInput);
        this.container.appendChild(wrapper);
    }

    private hexToRgba(hex: string): string {
        const r = parseInt(hex.substring(1, 3), 16);
        const g = parseInt(hex.substring(3, 5), 16);
        const b = parseInt(hex.substring(5, 7), 16);

        return `rgba(${r}, ${g}, ${b}, 1)`;
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        // Add code to update control view
    }

    public getOutputs(): IOutputs {
        return {
            Output_Rgba: this.rgbaValue
        };
    }

    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
