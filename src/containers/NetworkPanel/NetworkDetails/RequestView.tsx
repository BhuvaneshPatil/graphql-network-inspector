import { AutoFormatToggleButton } from "@/components/AutoFormatToggleButton"
import { CodeView } from "@/components/CodeView"
import { CopyButton } from "@/components/CopyButton"
import { IGraphqlRequestBody } from "@/helpers/graphqlHelpers"
import * as safeJson from "@/helpers/safeJson"
import { useToggle } from "@/hooks/useToggle"
import { Panels, PanelSection } from "./PanelSection"

interface IRequestViewProps {
  requests: IGraphqlRequestBody[]
}

const isVariablesPopulated = (request: IGraphqlRequestBody) => {
  return Object.keys(request.variables || {}).length > 0
}

export const RequestView = (props: IRequestViewProps) => {
  const { requests } = props

  const [autoFormat, toggleAutoFormat] = useToggle()

  return (
    <Panels>
      {requests.map((request) => {
        return (
          <PanelSection key={request.query} className="relative">
            <div className="flex gap-0.5 absolute right-3 top-3 z-10">
              <AutoFormatToggleButton
                active={autoFormat}
                onToggle={toggleAutoFormat}
              />{" "}
              <CopyButton textToCopy={request.query} />
            </div>

            {isVariablesPopulated(request) && (
              <CopyButton
                label="Copy Vars"
                textToCopy={safeJson.stringify(request.variables, undefined, 2)}
                className="absolute right-3 top-3 z-10 mt-14"
              />
            )}
            <CodeView
              text={request.query}
              language={"graphql"}
              autoFormat={autoFormat}
            />
            {isVariablesPopulated(request) && (
              <div className="bg-gray-200 dark:bg-gray-800 rounded-lg">
                <CodeView
                  text={safeJson.stringify(request.variables, undefined, 2)}
                  language={"json"}
                />
              </div>
            )}
          </PanelSection>
        )
      })}
    </Panels>
  )
}
