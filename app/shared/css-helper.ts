export class CssHelper {
   public static getCssLabel(word):any {

       switch(word){
            case "N/A":
			return {
				value: "N/A",
				class: "label na"
			}
            case "ENQUEUED":
			return {
				value: "PENDING",
				class: "label pending"
			}

            case "PENDING":
                return {
                    value: "PENDING",
                    class: "label pending"
                };

            case "Pending":
                return {
                    value: "PENDING",
                    class: "label pending"
                };
            case "IN_PROGRESS":
                return {
                    value: "IN PROGRESS",
                    class: "label in-progress"
                }

            case "COMPLETED":
                return {
                    value: "COMPLETED",
                    class: "label completed"
                }

            case "CANCELLED":
                return {
                    value: "CANCELLED",
                    class: "label cancelled"
                }
            case "USER":
                return {
                    value: "B2C",
                    class: "label b2c"
                }

            case "ENTERPRISE":
                return {
                    value: "B2B",
                    class: "label b2b"
                }

            case "Paid":
                return {
                    value: "PAID",
                    class: "label completed"
                }
            default:
                return {
                    value: word,
                    class: "label"
                }

       }
    }
}